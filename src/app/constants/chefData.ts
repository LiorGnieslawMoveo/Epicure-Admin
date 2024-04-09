export const displayedColumns = ['id', 'name', 'restaurants', 'chefOfTheWeek', 'description', 'deleted', 'edit'];

export const chefModalData: any = {
    title: 'Add New Chef',
    formFields: [
        { label: 'Name', type: 'text', placeholder: 'Enter chef name' },
        { label: 'Description', type: 'text', placeholder: 'Enter chef description' },
    ]
};