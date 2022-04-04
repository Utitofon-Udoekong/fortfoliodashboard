<!-- <script lang="ts" setup>
const filter = reactive<Filter>({
  userId: "",
  status: "Pending",
});
const sort = reactive<Sort>({
  column: "id",
  by: "asc",
});

const props = defineProps<Props>()
interface Props{
    column: any[]
    entries: any[]
}

const entries = toRef(props, 'entries')
const column = toRef(props, 'column')

const pageActive = ref<number>(1);
const limitPerPage = ref<number>(5);
const pageInfo = ref<any>({});
const totalPage = ref<number>(1);
const search = ref<string>("");


const filteredEntries = computed<any[]>(() => {
  let newEntries = entries.value;
  if (search.value.length >= 2) {
    newEntries = $.array.search(entries.value, search.value);
  }
  newEntries = $.object.isObjectValues(filter)
    ? $fetch.array.filtered(newEntries, filter)
    : newEntries;
  newEntries = $.array.sortBy(newEntries, sort.column, sort.by);
  pageInfo.value = $.array.pageInfo(
    newEntries,
    pageActive.value,
    limitPerPage.value
  );
  totalPage.value = $.array.pages(newEntries, limitPerPage.value);
  newEntries = $.array.paginate(
    newEntries,
    pageActive.value,
    limitPerPage.value
  );
  return newEntries;
});
const renderPagination = computed<any[]>(() => {
    return $.array.pagination(totalPage.value,pageActive.value,2)
})

</script>
<template></template>
<style></style> -->
