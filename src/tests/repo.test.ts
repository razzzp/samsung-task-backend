
import { configDotenv } from "dotenv";
import { RepoFactory } from "../factories/repo-factory"
// to fix some weird issue with jest & mysql2
import * as iconv from 'iconv-lite';
iconv.encodingExists('foo');

beforeAll(()=>{
    configDotenv();
})

test('test province repo', async ()=>{
    const repo = RepoFactory.buildProvinceRepo();
    await repo.getMany({});

})