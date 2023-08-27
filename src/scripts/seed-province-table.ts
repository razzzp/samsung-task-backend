

import { configDotenv } from "dotenv";
configDotenv()
import { KabupatenModel, ProvinceModel, sequelize } from "../data-source";

sequelize.sync({force:true}).then(()=>{
    ProvinceModel.create({name: 'Aceh'});
    ProvinceModel.create({name: 'Bali'});
    ProvinceModel.create({name: 'Banten'});
    ProvinceModel.create({name: 'DKI Jakarta'});
    ProvinceModel.create({name: 'Jawa Barat'});

    KabupatenModel.create({name: 'Depok', provinceId: 5});
})
