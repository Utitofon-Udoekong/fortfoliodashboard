<script lang="ts" setup>
import { onSnapshot, collection, query } from "@firebase/firestore";
const { $firestore } = useNuxtApp();
const adminLogs = ref([]);
const addLogs = ref([]);
const removeLogs = ref([]);
const editLogs = ref([]);
const openTab = ref(1);
const setLog = (data) => adminLogs.value.push(data);
const addLog = (data) => addLogs.value.push(data);
const removeLog = (data) => removeLogs.value.push(data);
const editLog = (data) => editLogs.value.push(data);
const toggleTabs = (toggleNumber: number) => (openTab.value = toggleNumber);

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
watchEffect(() => {
  const q = query(collection($firestore, "firestore_log"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        addLog(change.doc.data());
        setLog({ added: change.doc.data() });
      }
      if (change.type === "modified") {
        removeLog(change.doc.data());
        setLog({ modified: change.doc.data() });
      }
      if (change.type === "removed") {
        editLog(change.doc.data());
        setLog({ Removed: change.doc.data() });
      }
    });
  });
});
onUnmounted(() => {
  const q = query(collection($firestore, "firestore_log"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
  });
  unsubscribe()
})
</script>
<template>
  <div>
    <Html>
      <Head>
        <Title>logs</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard logs page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <div class="p-5 bg-white rounded-md shadow w-full">
        <div class="flex flex-wrap">
          <div class="w-full">
            <div class="title mb-3">
              <p class="font-semibold text-base">Investment Overview</p>
            </div>
            <div class="tab-header border-b border-gray-400 mb-4">
              <ul class="flex list-none flex-wrap flex-row -mb-px">
                <li class="mr-2 ml-5">
                  <a
                    href="#"
                    :class="{
                      'text-gray-500 hover:text-gray-600 border-transparent':
                        openTab !== 1,
                      'text-brand-light-blue border-brand-light-blue':
                        openTab === 1,
                    }"
                    class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                    @click="toggleTabs(1)"
                    >Overview</a
                  >
                </li>
                <li class="mr-2 ml-5">
                  <a
                    href="#"
                    :class="{
                      'text-gray-500 hover:text-gray-600 border-transparent':
                        openTab !== 2,
                      'text-brand-light-blue border-brand-light-blue':
                        openTab === 2,
                    }"
                    class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                    @click="toggleTabs(2)"
                    >Added logs</a
                  >
                </li>
                <li class="mr-2">
                  <a
                    href="#"
                    :class="{
                      'text-gray-500 hover:text-gray-600 border-transparent':
                        openTab !== 3,
                      'text-brand-light-blue border-brand-light-blue':
                        openTab === 3,
                    }"
                    class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                    @click="toggleTabs(3)"
                    >Deleted Logs</a
                  >
                </li>
                <li class="mr-2">
                  <a
                    href="#"
                    :class="{
                      'text-gray-500 hover:text-gray-600 border-transparent':
                        openTab !== 4,
                      'text-brand-light-blue border-brand-light-blue':
                        openTab === 4,
                    }"
                    class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                    @click="toggleTabs(4)"
                    >Edited Logs</a
                  >
                </li>
              </ul>
            </div>
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6">
              <div class="px-4 py-5 flex-auto">
                <div class="tab-content tab-space">
                  <div
                    v-bind:class="{ hidden: openTab !== 1, block: openTab === 1, }"
                  >
                  <div class="" v-for="(log, index) in adminLogs">
                    {{index}}: {{log}}
                  </div>
                  </div>
                  <div
                    v-bind:class="{ hidden: openTab !== 2, block: openTab === 2, }"
                  >
                  <div class="" v-for="(log, index) in addLogs">
                    {{index}}: {{log}}
                  </div>
                  </div>
                  <div
                    v-bind:class="{ hidden: openTab !== 3, block: openTab === 3, }"
                  >
                  <div class="" v-for="(log, index) in removeLogs">
                    {{index}}: {{log}}
                  </div>
                  </div>
                  <div
                    v-bind:class="{ hidden: openTab !== 3, block: openTab === 3, }"
                  >
                  <div class="" v-for="(log, index) in editLogs">
                    {{index}}: {{log}}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style></style>
