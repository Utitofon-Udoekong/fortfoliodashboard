
// defineProps<{
//     investmentsData: any
// }>()

// const get3MonthsFortDollarInvestment = computed((description: string) => {
//     const descrip = props.investmentsData.value.filter(
//       (investment) => investment.description === description
//     );
//     const _3months = descrip.filter((data) => data.duration === 3);
//     return (_3months.length / props.investmentsData.value.length) * 100;
//   });
//   const get6MonthsInvestment = computed((description: string) => {
//     const descrip = props.investmentsData.value.filter(
//       (investment) => investment.description === description
//     );
//     const _6months = descrip.filter((data) => data.duration === 6);
//     return (_6months.length / props.investmentsData.value.length) * 100;
//   });
//   const get12MonthsInvestment = computed((description: string) => {
//     const descrip = props.investmentsData.value.filter(
//       (investment) => investment.description === description
//     );
//     const _12months = descrip.filter((data) => data.duration === 12);
//     return (_12months.length / props.investmentsData.value.length) * 100;
//   });