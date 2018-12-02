const { errorMsg, usageMsg } = require('./utils/logs');
const {stdin, stdout, stderr, argv} = process

// npm
const is = require('@sindresorhus/is');

class JsonExplorer {
    constructor() {
        this.input = "";
        this.filter = argv[2];
        this.usage = usageMsg;
    }

    main(data, filter = [], skip = false) {
        const currentKey = skip ? filter[1] : filter.shift();
        const currentValue = skip ? data : data[currentKey];
        const nextValue = skip ? filter[1] : filter[0];

        switch (true) {
            case is.array(currentValue):
                console.log("is.array")
                if (nextValue) {
                    return currentValue.reduce((acc, e) => {
                        return [...acc, this.main(e[nextValue], filter, true)];
                    }, []);
                }
                return currentValue;
                break;
            case is.object(currentValue):
                console.log("is.object")
                if (nextValue) {
                    return this.main(currentValue[nextValue], filter, true);
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
                console.log(objFiltered)
            }
        })
    }
}

new JsonExplorer().init()