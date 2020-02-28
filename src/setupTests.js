import chai from 'chai'
import dirtyChai from 'dirty-chai'
import createChaiJestDiff from 'chai-jest-diff'
import createChaiEnzyme from 'chai-enzyme'
import chaiJestSnapshot from 'chai-jest-snapshot'
import enzymeToJSON from 'enzyme-to-json/serializer'
import { configure as configureEnzyme, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinonChai from 'sinon-chai'

chai
    .use(dirtyChai)
    .use(createChaiJestDiff())
    .use(createChaiEnzyme())
    .use(chaiJestSnapshot)
    .use(sinonChai)

expect.addSnapshotSerializer(enzymeToJSON)
configureEnzyme({adapter: new Adapter()})