export const displayedColumns = ['id', 'title', 'rating', 'dishes', 'chef', 'deleted', 'edit'];

export const restaurantModalData: any = {
    title: 'Add New Restaurant',
    formFields: [
        { label: 'Title', type: 'text', placeholder: 'Enter Restaurant title' },
        { label: 'Rating', type: 'number', placeholder: 'Enter Restaurant rating' },
        { label: 'Chef', type: 'dropdown', placeholder: 'select the chef' },
    ]
};