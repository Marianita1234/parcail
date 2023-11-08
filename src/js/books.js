//escuchador de eventos
document.addEventListener('DOMContentLoaded', function () {
    const saveBookButton = document.getElementById('saveBookButton');
    saveBookButton.addEventListener('click', function () {
        const bookname = document.getElementById('name').value;
        const bookauthor = document.getElementById('author').value;
        const bookgenre = document.getElementById('genre').value;
        const bookvalor = document.getElementById('valor').value;
        const bookpaginas = document.getElementById('paginas').value;
        saveBook({ bookname, bookauthor, bookgenre,bookvalor,bookpaginas, });
        
    });
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => showbooks(data))
        .catch(function (error) {
            console.log(error)
        })

});

function showbooks(books) {
    let Arraybook = '';
    books.forEach(books => {
        Arraybook += `<tr>
   <td scope="row">${books.id}</td>
    <td>${books.title}</td>
    <td>${books.genre}</td>
    <td>${books.author}</td>
    <td>${books.valor}</td>
    <td>${books.paginas}</td>
    <td>${books.estado }</td>
<td><button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#editar">
    EDITAR
  </button><td>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="libroAEliminar('${books.id}', '${books.title}')">
    ELIMINAR
  </button>
 
 </tr>`;
    
        console.log(Arraybook);
    });
    const tablebody = document.getElementById('tablebody');
    tablebody.innerHTML = Arraybook;

}
async function saveBook({ bookname, bookauthor, bookgenre,bookvalor,bookpaginas,bookcheckbox,}) {
    try {

        let request = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                title: bookname,
                author: bookauthor,
                genre: bookgenre,
                valor:bookvalor,
                paginas:bookpaginas,


                })
            
        });
        let createBookModal = new bootstrap.Modal(document.getElementById(exampleModal))
        createBookModal.hide();
    } catch (error) {
      

        
    }
    function hideModal(modalId) {
        const existingModal = document.getElementById(modalId);
        const modal = bootstrap.Modal.getInstance(existingModal);
        modal.hide();
    }
}

//funcion eliminar
let libroQueVoyAEliminar = "";
function libroAEliminar(id,title){
    libroQueVoyAEliminar = id
    document.getElementById('spanId').innerHTML = id;
    document.getElementById('spanTitulo').innerHTML = title;
    
}

function eliminarLibro(){
    let id = libroQueVoyAEliminar;
    console.log(id);
    fetch('http://localhost:3000/books/'+ id, {
        method: 'DELETE',
        headers:{
            "content-type": "aplication/json"
        }
    })
    .then(res => res.json())
    .then(res =>{
        alert('libro eliminado')
    })
    .catch(
      function(error){
        alert('error al tratar de borrar el libro')
      }  
    )

}
function showBook(book) {
    const bookDetailsContent = document.getElementById('detalle');
    bookDetailsContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-3" style="max-width: 440px;">
                    <div class="row g-0 h-100 w-100">
                        <div class="col-md-4">
                        <img src="${book.imgURL}" class="img-fluid rounded-start h-100 w-100" alt="${book.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.author}</p>
                                <p class="card-text"><small class="text-muted">${book.genre}</small></p>
                                <p class="card-text"><small class="text-muted">${book.valor}</small></p>
                                <p class="card-text"><small class="text-muted">${book.paginas}</small></p>
                                <p class="card-text"><small class="text-muted">${book.estado}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

async function bookDetails(id) {
    try {
        let request = await fetch(`http://localhost:3000/books/${id}`, {
            method: 'GET'
        });
        let data = await request.json();
        if (data.ok) {
            alert('Book GET successfully');
            showBook(data.book);
            showModal('bookDetailsModal');
        } else {
            alert('Failed book GETING');
        }
    } catch (error) {
        console.log(error);
        alert('ERROR');
    }
}

function showModal(idModal) {
    const myModal = new bootstrap.Modal(`#${idModal}`, {
        keyboard: false
    });
    myModal.show();
}

function hideModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = new bootstrap.Modal(existingModal);
    modal.hide();
}