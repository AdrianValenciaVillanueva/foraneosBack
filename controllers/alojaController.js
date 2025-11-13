// Se importa la conexión a la base de datos
const db = require('../db');

//Crear Alojamiento
exports.crearAlojamiento = async (req, res) => {
    try{
        const {
            alojamiento,
            muebles,
            servicios,
            amenidades
        } = req.body;

        //Validar alojamiento
        const {
        ID_Rentador, Titulo, Renta, Tipo_Aloja, Disponibilidad,
        Direccion, TiempoTrans, Medio, NumeroCel, Descripcion
        } = alojamiento;

        //Validar muebles
        const {
        Aplica, Cama, Ropero, Lampara, Silla,
        Buro, Ventilador, Calefaccion, Espejo, Cortinas, TV
        } = muebles;

        //Validar servicios
        const {
            Internet, Agua_Cal, Electricidad, Gas,
            Limpieza, Agua_Pot
        } = servicios;

        //Validar amenidades
        const {
            Cocina, Refrigerador, Microondas, Lavadora, Secadora,
            Sala, Cochera, Patio, Estudio
        } = amenidades

        if (!ID_Rentador || !Titulo || !Renta || !Tipo_Aloja || !Disponibilidad || !Direccion || !TiempoTrans || !Medio || !NumeroCel || !Descripcion) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para crear el alojamiento' });
        }

        //Consulta para insertar en la tabla alojamiento
        const consulta1 = `
        INSERT INTO alojamiento (
            ID_Rentador, Titulo, Renta, Tipo_Aloja, Disponibilidad,
            Direccion, TiempoTrans, Medio, NumeroCel, Estado, Descripcion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    //Atributos de la tabla alojamiento
        const atributos1 = [
        ID_Rentador, Titulo, Renta, Tipo_Aloja, Disponibilidad,
        Direccion, TiempoTrans, Medio, NumeroCel, 1, Descripcion
        ];

        //Se hace la inserción en la tabla alojamiento con los datos anteriormente definidos
        const [result] = await db.query(consulta1, atributos1);

        //Se obtiene el ID del alojamiento
        const ID_Alojamiento = result.insertId;

            //Consulta y atributos para insertar en la tabla muebles
            const consulta2 = `
                INSERT INTO muebles (ID_Alojamiento, Aplica, Cama, Ropero, Lampara, Silla, 
                Buro, Ventilador, Calefaccion, Espejo, Cortinas, TV
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
            `;
            const atributos2 = [
                ID_Alojamiento, Aplica, Cama, Ropero, Lampara, Silla,
                Buro, Ventilador, Calefaccion, Espejo, Cortinas, TV
            ];

            //Consulta y atributos para insertar en la tabla servicios
            const consulta3 = `
                INSERT INTO servicios (ID_Alojamiento, Internet, Agua_Cal, Electricidad, Gas, 
                Limpieza, Agua_Pot
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const atributos3 = [
                ID_Alojamiento, Internet, Agua_Cal, Electricidad, Gas,
                Limpieza, Agua_Pot
            ];

            //Consulta y atributos para insertar en la tabla amenidades
            const consulta4 = `
                INSERT INTO amenidades (ID_Alojamiento, Cocina, Refrigerador, Microondas, Lavadora, Secadora,
                Sala, Cochera, Patio, Estudio
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const atributos4 = [
                ID_Alojamiento, Cocina, Refrigerador, Microondas, Lavadora, Secadora,
                Sala, Cochera, Patio, Estudio
            ];
            
        //Se realizan las demás consultas para las otras tablas relacionadas
        await db.query(consulta2, atributos2); //Tabla muebles
        await db.query(consulta3, atributos3); //Tabla servicios
        await db.query(consulta4, atributos4); //Tabla amenidades

        res.status(201).json({
        message: 'Alojamiento creado exitosamente',
        ID_Alojamiento: result.insertId
        });

    }catch(error){
        res.status(500).json({message: 'Error al crear el alojamiento', error: error.message});
    }
}