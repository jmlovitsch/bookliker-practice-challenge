document.addEventListener("DOMContentLoaded", function() {

    const ce = (element) => {
        return document.createElement(element)
    }
    const panel = document.getElementById("list")
    const show = document.getElementById("show-panel")

    const getBooks = () => {
        fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(books => populatePanel(books))
    }

    const populatePanel = (books) => {

        books.forEach(book => {
            const li = ce('li')
            li.innerText = book.title
            // li.dataset.id = book.id
            panel.append(li)
            li.addEventListener('click', e => {
                fetch("http://localhost:3000/books/"+book.id)
                .then(resp => resp.json())
                .then(json => populateShow(json))
            })
        })

    }

    const populateShow = (book) => {
        console.log(book)
        show.innerHTML = ''
        const img = ce('img')
        const h1 = ce('h1')
        const h2 = ce('h2')
        const p = ce('p')
        const h4 = ce('h4')
        const likeButton = ce('button')
        const likes = ce('p')

        likes.innerText = `This book has ${book.users.length} likes`

        img.src = book.img_url
        h1.innerText = book.title
        h2.innerText = book.subtitle
        p.innerText = book.description
        h4.innerText = book.author
        likeButton.innerText = "Like"

        likeButton.addEventListener('click', event => {
            event.preventDefault()
            usersArray = []
            book.users.forEach(user => {
                usersArray.push(user)
            })
            usersArray.push({"id":1, "username":"pouros"})


            const bodyObj = {
                'users': usersArray
            }

            //Front End>
            if (book.users.length === 0) {
                likes.innerText = `This book has 1 like`
            } else {
                likes.innerText = `This book has ${book.users.length + 1} likes`
            }

            //backend>
            const FetchData = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(bodyObj)
            }

            fetch("http://localhost:3000/books/"+book.id, FetchData)
            .then(resp => resp.json())
            .then(console.log)




            //<

            // {"id":1, "username":"pouros"}
        })



        show.append(img, h1, h2, h4, p, likes, likeButton)


    }

    getBooks()

});
