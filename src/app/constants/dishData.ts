export const displayedColumns = ['id', 'title', 'description', 'price', 'iconMeaning', 'restaurant', 'deleted', 'edit'];

export const dishModalData: any = {
    title: 'Add New Dish',
    formFields: [
        { label: 'Title', type: 'text', placeholder: 'Enter dish title' },
        { label: 'Description', type: 'text', placeholder: 'Enter dish description' },
        {
            label: 'Price', type: 'number', placeholder: 'Enter dish price'
        },
        { label: 'Icon Meaning', type: 'dropdown', placeholder: 'select icon meaning' },
        { label: 'Restaurants', type: 'dropdown', placeholder: 'select restaurant' },
    ]
};