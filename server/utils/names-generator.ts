import { faker } from '@faker-js/faker'

const namesGenerator = (): string => {
    return `${faker.name.findName()}`
}

export { namesGenerator }
