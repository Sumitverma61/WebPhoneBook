if (!localStorage.getItem('contacts')) {
    localStorage.setItem('contacts', JSON.stringify([]));
}

$('body').on('click', '#fetch', fetchContact);
$('body').on('click', '#add', addContact);
$('body').on('click', '#save', saveContact);
$('body').on('click', '#fetchPage', fetchPage);

function fetchContact() {
    const searchValue = $('#search').val();
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const contact = contacts.find(contact => contact.name === searchValue);
    if (contact) {
        $('#output').html(`Contact found: <br>Name: ${contact.name} <br>Mobile: ${contact.mobile} <br>Email: ${contact.email}`);
    } else {
        $('#output').html('Contact does not exist');
    }
}

function addContact() {
    $('#dynamicContent').html(`
        <input type="text" id="name" placeholder="Name...">
        <input type="text" id="mobile" placeholder="Mobile No...">
        <input type="text" id="email" placeholder="Email...">
        <button id="save">Save</button>
        <button id="fetchPage">Fetch Contact</button>
    `);
}

function saveContact() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const newContact = {
        name: $('#name').val(),
        mobile: $('#mobile').val(),
        email: $('#email').val()
    };

    const existingContact = contacts.find(contact => contact.name === newContact.name || contact.mobile === newContact.mobile);
    if (existingContact) {
        $('#output').html('Contact with same name or number already exists');
    } else {
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        $('#name').val('');
        $('#mobile').val('');
        $('#email').val('');

        $('#output').html('Contact saved successfully');
    }
}

function fetchPage() {
    $('#dynamicContent').html(`
        <input type="text" id="search" placeholder="Search contact...">
        <button id="fetch">Fetch Contact</button>
        <button id="add">Add New Contact</button>
    `);
}