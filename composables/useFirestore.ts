const {$db} = useNuxtApp()
// const fireDb = $db
// export default fireDb

export const useFirestore = () => {
    return useState("firestore", () => $db)
}