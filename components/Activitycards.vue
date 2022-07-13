<script lang="ts" setup>
import { query, collectionGroup, onSnapshot, collection } from '@firebase/firestore';

const {$firestore} = useNuxtApp()
const investments = ref([])
const users = ref([])
const userCount = computed(() => {
  return users.value.length
})
const snapinvestments = (snap) => investments.value.push(snap)
const snapUsers = (snap) => users.value.push(snap)
const totalInvestments = investments.value.reduce((acc, inv) => {
    return acc + (inv.description.includes("FortShield")? inv.amount / 590 : inv.amount);
  }, 0)
console.log(totalInvestments.value)
const dueInvestmentAmount = investments.value.filter(
    (inv) => new Date(inv.dueDate.slice(0,10)).toString() === new Date(new Date().toISOString().slice(0,10)).toString()
  ).reduce((acc, inv) => {
    return acc + (inv.description.includes("FortShield") ? inv.amount / 590 : inv.amount) + inv.planYield;
  },0)
const details = [
  {
    url: "users",
    numbers: `${userCount.value}`,
    title: "New users",
  },
  {
    url: "chart",
    numbers: `$${totalInvestments.toLocaleString('en-US', {minimumFractionDigits: 2})}`,
    title: "Total investment",
  },
  {
    url: "graph",
    numbers: `$${dueInvestmentAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}`,
    title: "Total due investment",
  },
];
const stop = watchEffect(() => {
  const q = query(collectionGroup($firestore, "investments"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
          snapinvestments(change.doc.data());
      }
      if (change.type === "modified") {
        investments.value = investments.value.map((x: { traxId: string; }) => (x.traxId === change.doc.data()["traxId"]) ? change.doc.data() : x)
      }
      if (change.type === "removed") {
        investments.value = investments.value.filter((x) => x.traxId != change.doc.data()["traxId"])
      }
    });
    console.log("inv",investments.value)
  });
})
const stop2 = watchEffect(() => {
  const q = query(collection($firestore, "authUsers"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
          snapUsers(change.doc.data());
      }
      if (change.type === "modified") {
        users.value = users.value.map((x: { traxId: string; }) => (x.traxId === change.doc.data()["traxId"]) ? change.doc.data() : x)
      }
      if (change.type === "removed") {
        users.value = users.value.filter((x) => x.traxId != change.doc.data()["traxId"])
      }
    });
    console.log("users",users.value)
  });
})

onUnmounted(() => {
  const q = query(collectionGroup($firestore, "investments"));
  const unsubscribe = onSnapshot(q, (_) => {
    
  });
  const u = query(collection($firestore, "authUsers"));
  const unsubscribe2 = onSnapshot(u, (_) => {
    
  });
  unsubscribe()
  unsubscribe2()
  stop()
  stop2()
});
</script>
<template>
  <div class="flex gap-3 mb-12">
    <div
      class="card rounded-[10px] bg-white py-8 px-[50px] flex justify-center items-center w-full"
      v-for="(detail, index) in details"
    >
      <PNGImage :path="detail.url" :alt="`users-${index}`" class="mr-4" />
      <div class="details">
        <p class="text-xl font-semibold text-[#171717]">{{ detail.numbers }}</p>
        <p class="text-lg font-medium text-brand-ash">{{ detail.title }}</p>
      </div>
    </div>
  </div>
</template>
<style></style>
