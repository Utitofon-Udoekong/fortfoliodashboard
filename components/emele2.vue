<script lang="ts" setup>
import { $array, $object } from 'alga-js';
import { TableData, TableHeader } from '~~/utils/types/table';

interface Props {
    columns: TableHeader[]
    entries: TableData[]
}
const props = defineProps<Props>()
const entries = toRef(props, 'entries')
const columns = toRef(props, 'columns')
const tableHeader = computed<TableHeader[]>(() => {
    return columns.value || []
})
const tableData = computed<TableData[]>(() => {
    return entries.value || []
})
const raw = inject('raw')
const col: TableData = reactive({
    id: "",
    name: "",
    extension: "",
    office: "",
    position: "",
    salary: "",
    startDate: ""
})
const uniqColumnData = (column: string) => {
    return $array.unique(raw,column)
}
const filterByColumn = () => {
    const filterCol = $object.removeBy('', col)
    // let filterData = 
}
</script>
<template>
<table>
    <thead>
        <tr>
            <th v-for="(header, index) in tableHeader" :key="index">
                <div class="flex items-center" >
                    <span>{{header.text}}</span>
                    <span>
                        <i-mdi-filter-variant/>
                    </span>
                </div>
            </th>
        </tr>
        <tr>
            <td><input type="search" placeholder="Filter id" v-model="col.id" @keyup="filterByColumn"></td>
            <td><input type="search" placeholder="Filter name" v-model="col.name" @keyup="filterByColumn"></td>
            <td>
                <input type="search" placeholder="Filter position" v-model="col.position">
            <select v-model="col.position" @change="filterByColumn">
                <option value="">-- Filter Position --</option>
                <option value="" v-for="(cd, i) in uniqColumnData('position')" :key="i" :value="cd">{{cd}}</option>
            </select>
            </td>
            <td><input type="search" placeholder="Filter extension" v-model="col.extension" @keyup="filterByColumn"></td>
            <td><input type="search" placeholder="Filter startDate" v-model="col.startDate" @keyup="filterByColumn"></td>
            <td><input type="search" placeholder="Filter office" v-model="col.office" @keyup="filterByColumn"></td>
            <td><input type="search" placeholder="Filter salary" v-model="col.salary" @keyup="filterByColumn"></td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(data, index) in tableData" :key="index">
            <td>{{data.id}}</td>
            <td>{{data.name}}</td>
            <td>{{data.position}}</td>
            <td>{{data.office}}</td>
            <td>{{data.extension}}</td>
            <td>{{data.startDate}}</td>
            <td>{{data.salary}}</td>
        </tr>
    </tbody>
</table>
</template>
<style>
</style>