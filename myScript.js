// Load items
window.onload = async function () {
    const items = await getListApi();
    const activeItems = items
     //   .filter(item => item.active === 'true')
        .map(item => item.name);
    activeItems.forEach(function (item) {
        addItemToList(item);
    });
};

// Add item to the list
async function addItem() {
    var item = document.getElementById('inputItem').value;
    if (item) {
        await addItemToList(item);
    }
    document.getElementById('inputItem').value = '';
}

// Add item to the list element
function addItemToList(item) {
    const list = document.getElementById('list');
    const listItem = document.createElement('li');
    listItem.innerHTML = '<input type="checkbox"  onchange="removeItem(\'' + item + '\')"><label style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; width: 200px;">' + item + '</label><br><br><br>';
    list.appendChild(listItem);
}

async function saveItem(item) {
    await saveToListApi(item);
}

// Remove item from the list and local storage
async function removeItem(item) {
    await removeFromListApi(item);
}

async function getListApi() {
    try {
        let response = await fetch('https://the-list-app-nkh89hix.fermyon.app/list/item/3',{mode: 'no-cors'});
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function saveToListApi(item) {
    try {
        const response = await fetch('https://the-list-app-nkh89hix.fermyon.app/list/item', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"listId": 3, "name": item, "deName": "", "active": "true"}),
            mode: 'no-cors',
        });
        console.log("STATUS :" + response.status)
    } catch (error) {
        console.error('Error while saving item to database', error);
    }
}

async function removeFromListApi(item) {
    try {
        await fetch(`https://the-list-app-nkh89hix.fermyon.app/list/item/${item}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error while saving item to database', error);
    }
}
