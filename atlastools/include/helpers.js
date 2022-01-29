const fs = require('fs');
module.exports = {
    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    stop: async function() {
        await this.sleep(200000000);
    },

    contains: function(list, search) {
        for (var i in search) {
            for (var x in list) {
                if (x == search[i]) {
                    return true;
                }
            }
        }
        return false;
    },

    hasType: function(list, type) {
        for (var x in list) {
            if (x.startsWith(type)) {
                return true;
            }
        }
        return false;
    },

    gridName: function(x, y) {
        return String.fromCharCode(65 + x) + (1 + y);
    },

    constraint: function(value, minVal, maxVal, minRange, maxRange) {
        return (((value - minVal) / (maxVal - minVal)) * (maxRange - minRange));
    },

    parseJSONFile: function(file) {
        const rawdata = fs.readFileSync(file);
        return JSON.parse(rawdata);
    },

    /*
    function GPStoLeaflet(x, y) {
        var long = ((y - 100) * 0.3636363636363636) * 1.28  ,
                  lat = ((100 + x) * 0.3636363636363636) * 1.28 ;
      
                  return [long, lat];
      }*/

    translateGPS: function(c) {
        let y = this.constraint(c[1], -350, -150, 0, 200) - 100,
            x = this.constraint(c[0], 200, 450, 0, 200) - 100;


        //  console.log(x, y)

        return [x, y];
    },

    sortObjByKey: function(value) {
        return (typeof value === 'object') ?
            (Array.isArray(value) ?
                value.map(sortObjByKey) :
                Object.keys(value).sort().reduce(
                    (o, key) => {
                        const v = value[key];
                        o[key] = sortObjByKey(v);
                        return o;
                    }, {})
            ) :
            value;
    },

    clone: function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },

    inside: function(i, c) {
        let
            x1 = i.worldX - (i.islandHeight / 2),
            y1 = i.worldY - (i.islandWidth / 2),
            x2 = i.worldX + (i.islandHeight / 2),
            y2 = i.worldY + (i.islandWidth / 2),
            x = c[0],
            y = c[1];

        if (x > x1 &&
            x < x2 &&
            y > y1 &&
            y < y2) {
            return true;
        }
        return false;
    },

    distance: function(c1, c2) {
        var xs = c1[0] - c2[0],
            ys = c1[1] - c2[1]

        xs *= xs;
        ys *= ys;

        return Math.sqrt(xs + ys);
    }
}