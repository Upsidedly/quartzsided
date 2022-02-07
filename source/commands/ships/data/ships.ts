import { ShipInfo } from "../../../handler/types.js";
import fs from 'fs/promises'

const ships: ShipInfo[] = []

const shiplist = await fs.readFile('./ships.txt', 'utf-8')
for (const ship of shiplist.split('.\n')) {
    const newOne = {} as ShipInfo
    let lineNum = 1
    for (const line of ship.split('\n')) {
        if (lineNum == 1) {
            newOne['verifiedNames'] = line.split(', ')
        } else if (lineNum == 2) {
            if (line === '') { lineNum += 1; continue }
            newOne['otherNames'] = line.split(', ')
        } else if (lineNum == 3) {
            newOne['ship'] = line.split(' x ')
        } else if (lineNum == 4) {
            newOne['status'] = line.substring(8)
        }
        ++lineNum
    }
    ships.push(newOne);
}

console.log(ships)
export default ships

