let token = null

const blogs = [
  {
    "id": "5a422a851b54a676234d17f7",
    "user": [],
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7
  },
  {
    "id": "5a422aa71b54a676234d17f8",
    "user": [],
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5
  },
  {
    "id": "5a422b3a1b54a676234d17f9",
    "user": [],
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 16
  },
  {
    "id": "5a422b891b54a676234d17fa",
    "user": [],
    "title": "First class tests",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    "likes": 10
  },
  {
    "id": "5b463f718326eb285c8b9aeb",
    "user": [
      {
        "_id": "5b44e7ae1426df06ac83023c",
        "username": "kidkulma",
        "name": "Kimmo K"
      }
    ],
    "title": "asd",
    "author": "Kimmo",
    "url": "Kimmo",
    "likes": 9
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {
  token = `bearer ${token}`
}

export default { getAll, blogs, setToken }