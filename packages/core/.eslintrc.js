module.exports = {
    "extends": [
        "prettier",
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "plugins": ["prettier"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "project": ["./tsconfig.json"]
    },
    "env": {
        "es6": true,
        "browser": true,
        "jest": true
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "overrides": [
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "parser": "@typescript-eslint/parser",
            "rules": {
                "no-undef": "off"
            }
        }
    ],
    "ignorePatterns": ["tests/**/*.test.tsx", "dist/*", "node_modules/*", ".eslintrc.js"]
};
