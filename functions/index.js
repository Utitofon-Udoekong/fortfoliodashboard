require('dotenv').config()
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().functions);
const firestore = admin.firestore()
const cors = require('cors')({ origin: '*' });
const { Client, Webhook, resources } = require('coinbase-commerce-node');
const coinbaseSecret = process.env.COINBASE_API_KEY;
Client.init(coinbaseSecret);
const { Charge } = resources;

exports.scheduleInvestments = functions.pubsub.schedule('0 0 * * *')
  .onRun((context) => {
    const investment = firestore.collectionGroup("investments").where("status", "==", "Successful")
    const now = new Date().toISOString()
    return investment.get().then(querySnapshot => {
      if (querySnapshot.empty) {
        functions.logger.log("No Accepted investments")
        return null;
      } else {
        let batch = firestore.batch();
        querySnapshot.forEach(doc => {
          const documentData = doc.data()
          const amountInvested = documentData["amount"] ?? 0
          const roi = documentData["roi"] ?? 0
          const duration = documentData["duration"]
          const numberOfDays = documentData["numberOfDays"]
          const currentRoiForDuration = ((roi / 100) * duration) / 12
          const returnsAtEndOfDuration = currentRoiForDuration * amountInvested
          const returnsPerDay = returnsAtEndOfDuration / numberOfDays
          const dueDate = documentData["dueDate"]
          if (new Date(now.slice(0, 10)) < new Date(dueDate.slice(0, 10)) || new Date(now.slice(0, 10)).toString() === new Date(dueDate.slice(0, 10)).toString()) {
            batch.update(doc.ref, { planYield: admin.firestore.FieldValue.increment(returnsPerDay) });
          } else {
            return null;
          }
        });
        return batch.commit()
      }

    }).catch(error => {
      functions.logger.log(error);
      return null;
    });

  });


exports.createCharge = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const chargeData = {
      name: "Fort Crypto",
      description: "Investment",
      local_price: {
        currency: 'USD',
        amount: req.query.amount
      },
      pricing_type: 'fixed_price',
    };

    const charge = await Charge.create(chargeData);
    res.send(charge);
  });
});
exports.firestoreLogger = functions.firestore
  .document('{collection}/{id}')
  .onWrite(async (change, context) => {
    const { collection, id } = context.params;
    if (collection !== 'firestore_log') {
      try {
        const event = context.eventType;
        const data = {
          before: change.before.data() ?? "Data unavailable",
          after: change.after.data() ?? "Data unavailable"
        };
        const created_at = admin.firestore.Timestamp.fromDate(new Date()).toDate()
        admin.firestore().collection('firestore_log').add({ collection, documentId: id, event, data, created_at });
      } catch (error) {
        functions.logger.error(error);
      }
    }
  });
exports.webhookHandler = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const rawBody = req.rawBody;
    const signature = req.headers['x-cc-webhook-signature'];
    const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;

    try {
      const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);
      if (event.type === "charge:pending") {
        functions.logger.log("pending payment");
      }

      if (event.type === "charge:confirmed") {
        functions.logger.log("charge confirmed");
      }

      if (event.type === "charge:failed") {
        functions.logger.log("charge failed");
      }
      res.send(`${event.id}`);

    } catch (error) {
      functions.logger.error(error);
      res.status(400).send('failure!');
    }
  })
});


exports.scheduleUserDeletion = functions.pubsub.schedule('0 0 * * *')
.onRun((context) => {
  const userSnap = firestore.collection("authUsers").where("isAccountActive","==",false).where("status", "==", "Deleted")
  const now = new Date().toISOString()
  return userSnap.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      functions.logger.log("No deleted account")
      return null;
    } else {
      let batch = firestore.batch();
      querySnapshot.forEach(async (doc) => {
        const documentData = doc.data()
        const dueDate = documentData["deleteDate"]
        if (new Date(now.slice(0, 10)).toString() === new Date(dueDate.slice(0, 10)).toString()) {
          await admin.auth().deleteUser(doc.id).then(() => {
            batch.delete(doc.ref)
          }).catch((error) => {
            functions.logger.log('Error deleting user:', doc.id + 'error: ' + error);
          });
        } else {
          return null;
        }
      });
      return batch.commit()
    }

  }).catch(error => {
    functions.logger.log(error);
    return null;
  });

});