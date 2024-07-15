class API {
    static getData(value) {
        axios.get(`http://www.omdbapi.com/?apikey=49ba54f&s=${value}&page=1`)
        .then(res => {
            const { Search } = res.data
            App.displayResults(Search)
        })
        .catch((err) => console.log(err))
    }
}


class Movie {
    constructor(movie, ul) {
        this.Title = movie.Title
        this.Year = movie.Year
        this.Poster = movie.Poster 
        this.Status = movie.Status
        this.List = ul
    }

    render() {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const img = document.createElement('img')
        const h4 = document.createElement('h4')

        const addBtn = document.createElement('button')
        const delBtn = document.createElement('button')
        addBtn.textContent = 'Ajouter'
        delBtn.textContent = 'Supprimer'

        delBtn.classList.add('del-btn')

        h3.textContent = this.Title 
        img.src = this.Poster 
        h4.textContent = this.Year  

        li.append(img, h3, h4)
        this.List.appendChild(li)

        if (this.Status != 'in-list') {
            li.appendChild(addBtn)
            addBtn.addEventListener('click', () => {MyList.addToList(this)})
        } else {
            li.appendChild(delBtn)
            delBtn.addEventListener('click', () => {MyList.removeFromList(this)})
        }
    }
}


class MyList {
    static myList = []

    static addToList(movie) {
        movie.Status = 'in-list'
        this.myList.push(movie)
    }

    static removeFromList(item) {
        let newList = this.myList.filter(movie => movie.Title !== item.Title)
        this.myList = newList
        App.displayResults(newList)
    }
}


class App {
    init() {
        const submit = document.querySelector('.submit')
        const input = document.querySelector('input')
        const listBtn = document.querySelector('.btn-list')

        // Écouteurs d'événements
        submit.addEventListener('click', () => {
            API.getData(input.value)
        })

        listBtn.addEventListener('click', () => {
            App.displayResults(MyList.myList)
        })
    }

    static displayResults(movies) {
        const ul = document.querySelector('ul')

        ul.innerHTML = ""
    
        movies.map((movie) => {
            const newMovie = new Movie(movie, ul)
            newMovie.render()
        })
    }
}


window.addEventListener('DOMContentLoaded', () => {
    const app = new App
    app.init()
})