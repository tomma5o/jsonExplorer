const mock = require('./stubs/swapi.json');
const { errorMsg, usageMsg } = require('./utils/logs');
const {stdin, stdout, stderr, argv} = process

// npm
const is = require('@sindresorhus/is');

class JsonExplorer {
    constructor() {
        this.input = "";
        this.filter = argv[2];
        this.usage = usageMsg;

        this.main = this.main.bind(this)
    }

    /**
     * 
     * @param {*} data 
     * @param {} filter 
     * @param {*} internal - When is colled inside the main
     * @param {*} take - When the filter need to decrement but you need the data passed and not the data[currentKey]
     */
    main(data, filter = [], internal = false, take = false) {
        const currentKey = internal ? filter[0] : filter.shift();
        const nextKey = internal ? filter[1] : filter[0];
        const currentValue = (internal || take || is.array(data)) ? data : data[currentKey];

        switch (true) {
            case is.array(currentValue):
                if (nextKey) {
                    return currentValue.reduce((acc, e) => {
                        return [...acc, this.main(e[nextKey], filter, true)]
                    }, []);
                }
                return currentValue
                break;
            case is.object(currentValue):
                if (nextKey) {
                    return this.main(currentValue[nextKey], filter, internal, true);
                }
                return currentValue;
                break;
            default:
                return currentValue
                break;
        }
    }

    init() {
        stdin.setEncoding('utf8')

        if (!this.filter || stdin.isTTY) {
            stderr.write(this.usage);
            process.exit(2);
        }
        
        stdin.on('readable', () => {
            this.input = stdin.read();
            if (this.input) {
                var parsedData = JSON.parse(this.input);
                const objFiltered = this.main(parsedData, this.filter.split('.'));
                return objFiltered;
            }
        })
    }

    initDev(data, filter) {
        const objFiltered = this.main(data, filter.split('.'));
        return objFiltered;
    }
}

// new JsonExplorer().init()
module.exports = JsonExplorer;
// var jxplore = new JsonExplorer();