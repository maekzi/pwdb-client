job("Run Quality Checks") {
    container(displayName = "Run Frontend Testing", image = "node:18") {
        shellScript {
            interpreter = "/bin/bash"
            content = """
                cp codegen.ts.ci codegen.ts
                cp .env.ci .env
                npm install
                npm test
            """
        }
    }
}
