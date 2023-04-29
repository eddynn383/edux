// UTILIY FUNCTIONS USED TO COMPARE BETWEEN API CALL AND LOCAL FILTER

// const apiEditItem = async (id: string) => {
//     const startTime = performance.now();

//     try {
//         const response = await fetch(`/api/navigation?id=${id}`, { 
//             method: 'GET'
//         })

//         if (!response.ok) {
//             throw new Error('Netwerok repsonse was not ok')
//         }

//         const data = await response.json()

//         console.log(data)
//         setLabel(data.label)
//         setLink(data.link)
//         setIcon(data.icon)

//         const endTime = performance.now();
//         console.log(`API call method took ${endTime - startTime} milliseconds`);
//     } catch (error) {
//         console.log(error)
//     }
// }

// const localEditItem = async (id: string) => {
//     const startTime = performance.now();
//     const item = tableBody.find((item: any) => item.id === id)

//     if (item) {
//         console.log("*** START TABLE ITEM ***")
//         console.log(item)
//         console.log("*** END TABLE ITEM ***")
//         setFormData(item)
//         const endTime = performance.now();
//         console.log(`Filtering method took ${endTime - startTime} milliseconds`);
//     }
// }