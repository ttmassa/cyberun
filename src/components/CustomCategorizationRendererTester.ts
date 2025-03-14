import { rankWith, isCategorization } from "@jsonforms/core"

const customCategorizationTester = rankWith(10, (uischema) =>
    isCategorization(uischema)
)

export default customCategorizationTester