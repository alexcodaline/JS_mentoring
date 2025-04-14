document.getElementById('addContentBtn').addEventListener('click', addContent);
window.onload = loadContent;


function addContent() {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('fields are empty');
        return;
    }
    const contentContainer = document.getElementById('content-container');
    const contentBlock = createContentBlock(title, content);
    contentContainer.appendChild(contentBlock);

    titleInput.value = '';
    contentInput.value = '';
    saveContent();
}
function createContentBlock(title, content) {
    const contentBlock = document.createElement('div');
    contentBlock.classList.add('content-block');

    const contentTitle = document.createElement('h2');
    contentTitle.innerText = title;

    const contentText = document.createElement('p');
    contentText.innerText = content;

    const editButtons = document.createElement('div');
    editButtons.classList.add('edit-buttons');

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = () => editContent(contentBlock, title, content);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.onclick = () => deleteContent(contentBlock);

    editButtons.appendChild(editButton);
    editButtons.appendChild(deleteButton);

    contentBlock.appendChild(contentTitle);
    contentBlock.appendChild(contentText);
    contentBlock.appendChild(editButtons);

    return contentBlock;
}
function editContent(contentBlock, oldTitle, oldContent) {
    const newTitle = prompt('edit title', oldTitle);
    const newContent = prompt('edit text', oldContent);

    if (newTitle && newContent) {
        contentBlock.querySelector('h2').innerText = newTitle;
        contentBlock.querySelector('p').innerText = newContent;
    }
    saveContent();
}


function deleteContent(contentBlock) {
    contentBlock.remove();
    saveContent();
}

function saveContent() {
    const contentContainer = document.getElementById('content-container');
    const contentBlocks = contentContainer.getElementsByClassName('content-block');

    const contentArray = Array.from(contentBlocks).map(block => {
        return {
            title: block.querySelector('h2').innerText,
            content: block.querySelector('p').innerText,
        };
    });

    localStorage.setItem('content', JSON.stringify(contentArray));
}

function loadContent() {
    const savedContent = localStorage.getItem('content');
    
    if (savedContent) {
        const contentArray = JSON.parse(savedContent);
        const contentContainer = document.getElementById('content-container');

        contentArray.forEach(item => {
            const contentBlock = createContentBlock(item.title, item.content);
            contentContainer.appendChild(contentBlock);
        });
    }
}