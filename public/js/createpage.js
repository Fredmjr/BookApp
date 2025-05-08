const booktitle = document.querySelector('#title');

function send (){
    let data = {
        "title": booktitle.value,
        "file": "/"
    };
    console.log(data)
    fetch('/admin/addbook', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })

    .catch(error=>console.log(error))
} 

saveBtn.addEventListener('click', send)