const { errorMsg, usageMsg } = require('./utils/logs');
const {stdin, stdout, stderr, argv} = process

class JsonExplorer {
    constructor() {
        this.input = "";
        this.filter = argv[2];
        this.usage = usageMsg;
    }

    main(input, filter) {
        console.log(this.input, this.filter)
    }

    init() {
        stdin.setEncoding('utf8')

        if (!this.filter || stdin.isTTY) {
            stderr.write(this.usage)
            process.exit(2)
        }
        
        stdin.on('readable', () => {
            this.input = stdin.read();
            this.input && this.main(this.input, this.filter)
        })
    }
}

new JsonExplorer().init()