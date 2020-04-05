module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "Handlebars": false
    },
    "parserOptions": {
        "ecmaVersion": 2015
    },

    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "off"
        ],
        "quotes": [
            "error",
            "single",
            {"allowTemplateLiterals": true}
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ]
    }

};

