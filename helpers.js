import fsModule from "fs";

export function timeStamp() {
    return new Date().toLocaleDateString('en-gb', {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
}

export async function readFromFiles() {
    return new Promise((resolve, reject) => {
        try {
            fsModule.readFile('./db.json', 'utf-8', async (err, data) => {
                if (err) {
                    console.log(`Error reading from file: ${err}`)
                    return;
                }
                const response = await JSON.parse(data);
                resolve(response)
            })
        } catch (error) {
            reject(`Error parsing file: ${error}`)
        }
    })
}

export async function writeToFile(task) {
    fsModule.writeFile('./db.json', JSON.stringify(task, null, 2), (err) => {
        if (err) {
            console.log(`Error writing data: ${err}`)
            return;
        }
    })
}