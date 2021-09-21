const express = require('express')
const path = require('path')
const cors = require("cors");
const fs = require('fs')
const router = express
const app = express()
const port = 8888

interface Car {
    id: string,
    year: number,
    make: string,
    model: string,
    description: string,
    kilometers: number,
    price: number,
    images: string[]

}

const carsDataFilePath = path.join(__dirname, '../', 'public', 'assets/cars.json');

const readFileFromPath = async (path: string, callback: any = null) => {
    try {
        const fileData = await fs.promises.readFile(path, 'utf8')
        return callback(fileData)
    } catch (error) {
        return error;
    }
}
app.use(cors())
app.get('/api/status', (req: any, res: any) => {
    res.json({ "status": "OK" })
})

app.get('/api/list', async (req: any, res: any) => {
    const data = await readFileFromPath(carsDataFilePath, JSON.parse)
    if (data?.code) {
        return res.json({ "error": data, "status": 500 })
    }
    return res.json({ "data": data, "status": 200 })
})

app.get('/api/detail/:id', async (req: any, res: any) => {
    const params = req.params;
    const key = Object.keys(req.params)[0];
    try {
        const result: Car[] = await readFileFromPath(carsDataFilePath, JSON.parse).then((carsData) => carsData.cars.find((car: Car) => car.id === params[key]))
        return res.json({ data: { cars: result ? result : [] }, status: 200 })
    } catch (error) {
        console.log(error);
        return res.json({ error })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})