// Se importa la conexión a la base de datos
const db = require('../db');

//Crear Alojamiento
exports.crearAlojamiento = async (req, res) => {
    try{
        const alojamiento = JSON.parse(req.body.alojamiento);
        const muebles = JSON.parse(req.body.muebles);
        const servicios = JSON.parse(req.body.servicios);
        const amenidades = JSON.parse(req.body.amenidades);
        const imagenes = req.files;

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
            
            //Consulta y atributos para insertar en la tabla imagenes - pendiente de implementar

            const consulta5 = `
                INSERT INTO imagenes (
                    ID_Alojamiento, imagen1, imagen2, imagen3, imagen4, imagen5, imagen6
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const atributos5 = [
                ID_Alojamiento,
                imagenes.imagen1?.[0]?.buffer || null,
                imagenes.imagen2?.[0]?.buffer || null,
                imagenes.imagen3?.[0]?.buffer || null,
                imagenes.imagen4?.[0]?.buffer || null,
                imagenes.imagen5?.[0]?.buffer || null,
                imagenes.imagen6?.[0]?.buffer || null
            ];


            
        //Se realizan las demás consultas para las otras tablas relacionadas
        await db.query(consulta2, atributos2); //Tabla muebles
        await db.query(consulta3, atributos3); //Tabla servicios
        await db.query(consulta4, atributos4); //Tabla amenidades
        await db.query(consulta5, atributos5); //Tabla imagenes - pendiente de implementar

        res.status(201).json({
        message: 'Alojamiento creado exitosamente',
        ID_Alojamiento: result.insertId
        });

    }catch(error){
        res.status(500).json({message: 'Error al crear el alojamiento', error: error.message});
    }
}

//Funcion para obtener los alojamientos con estado True
exports.obtenerAlojamientos = async (req, res) => {
    try{
        const consulta = `SELECT 
        a.ID_Alojamiento, a.ID_Rentador, a.Titulo, a.Renta, a.Tipo_Aloja,
        a.Disponibilidad, a.Direccion, a.TiempoTrans, a.Medio, a.NumeroCel,
        a.Descripcion,

        m.Aplica, m.Cama, m.Ropero, m.Lampara, m.Silla, m.Buro, m.Ventilador,
        m.Calefaccion, m.Espejo, m.Cortinas, m.TV,

        s.Internet, s.Agua_Cal, s.Electricidad, s.Gas, s.Limpieza, s.Agua_Pot,

        am.Cocina, am.Refrigerador, am.Microondas, am.Lavadora, am.Secadora,
        am.Sala, am.Cochera, am.Patio, am.Estudio,

        i.imagen1, i.imagen2, i.imagen3, i.imagen4, i.imagen5, i.imagen6

            FROM alojamiento a
            JOIN muebles m ON a.ID_Alojamiento = m.ID_Alojamiento
            JOIN servicios s ON a.ID_Alojamiento = s.ID_Alojamiento
            JOIN amenidades am ON a.ID_Alojamiento = am.ID_Alojamiento
            LEFT JOIN imagenes i ON a.ID_Alojamiento = i.ID_Alojamiento
            WHERE a.Estado = 1; 
        `;
        //Después de realizar la consulta, se mapean los resultados para estructurarlos adecuadamente
        const [rows] = await db.query(consulta);

        const alojamientos = rows.map(row => ({
            ID_Alojamiento: row.ID_Alojamiento,
            alojamiento: {
                Titulo: row.Titulo,
                Renta: row.Renta,
                Tipo_Aloja: row.Tipo_Aloja,
                Disponibilidad: row.Disponibilidad,
                Direccion: row.Direccion,
                TiempoTrans: row.TiempoTrans,
                Medio: row.Medio,
                NumeroCel: row.NumeroCel,
                Descripcion: row.Descripcion
            },
            muebles: {
                Aplica: row.Aplica,
                Cama: row.Cama,
                Ropero: row.Ropero,
                Lampara: row.Lampara,
                Silla: row.Silla,
                Buro: row.Buro,
                Ventilador: row.Ventilador,
                Calefaccion: row.Calefaccion,
                Espejo: row.Espejo,
                Cortinas: row.Cortinas,
                TV: row.TV
            },
            servicios: {
                Internet: row.Internet,
                Agua_Cal: row.Agua_Cal,
                Electricidad: row.Electricidad,
                Gas: row.Gas,
                Limpieza: row.Limpieza,
                Agua_Pot: row.Agua_Pot
            },
            amenidades: {
                Cocina: row.Cocina,
                Refrigerador: row.Refrigerador,
                Microondas: row.Microondas,
                Lavadora: row.Lavadora,
                Secadora: row.Secadora,
                Sala: row.Sala,
                Cochera: row.Cochera,
                Patio: row.Patio,
                Estudio: row.Estudio
            },
            imagenes: {
                imagen1: row.imagen1 ? Buffer.from(row.imagen1).toString('base64') : null,
                imagen2: row.imagen2 ? Buffer.from(row.imagen2).toString('base64') : null,
                imagen3: row.imagen3 ? Buffer.from(row.imagen3).toString('base64') : null,
                imagen4: row.imagen4 ? Buffer.from(row.imagen4).toString('base64') : null,
                imagen5: row.imagen5 ? Buffer.from(row.imagen5).toString('base64') : null,
                imagen6: row.imagen6 ? Buffer.from(row.imagen6).toString('base64') : null
            }
        }));

        res.status(200).json(alojamientos);
    }catch(error){
        res.status(500).json({message: 'Error al obtener los alojamientos', error: error.message});
    }
}

//Funcion para obtener un alojamiento por ID
exports.alojamientoInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = `SELECT 
            a.ID_Alojamiento, a.ID_Rentador, a.Titulo, a.Renta, a.Tipo_Aloja,
            a.Disponibilidad, a.Direccion, a.TiempoTrans, a.Medio, a.NumeroCel,
            a.Descripcion,

            m.Aplica, m.Cama, m.Ropero, m.Lampara, m.Silla, m.Buro, m.Ventilador,
            m.Calefaccion, m.Espejo, m.Cortinas, m.TV,

            s.Internet, s.Agua_Cal, s.Electricidad, s.Gas, s.Limpieza, s.Agua_Pot,

            am.Cocina, am.Refrigerador, am.Microondas, am.Lavadora, am.Secadora,
            am.Sala, am.Cochera, am.Patio, am.Estudio,

            i.imagen1, i.imagen2, i.imagen3, i.imagen4, i.imagen5, i.imagen6

                FROM alojamiento a
                JOIN muebles m ON a.ID_Alojamiento = m.ID_Alojamiento
                JOIN servicios s ON a.ID_Alojamiento = s.ID_Alojamiento
                JOIN amenidades am ON a.ID_Alojamiento = am.ID_Alojamiento
                LEFT JOIN imagenes i ON a.ID_Alojamiento = i.ID_Alojamiento
                WHERE a.ID_Alojamiento = ?; 
        `;
    const [rows] = await db.query(consulta, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' });
    }

    const row = rows[0];
    const info = {
            ID_Alojamiento: row.ID_Alojamiento,
            alojamiento: {
                Titulo: row.Titulo,
                Renta: row.Renta,
                Tipo_Aloja: row.Tipo_Aloja,
                Disponibilidad: row.Disponibilidad,
                Direccion: row.Direccion,
                TiempoTrans: row.TiempoTrans,
                Medio: row.Medio,
                NumeroCel: row.NumeroCel,
                Descripcion: row.Descripcion
            },
            muebles: {
                Aplica: row.Aplica,
                Cama: row.Cama,
                Ropero: row.Ropero,
                Lampara: row.Lampara,
                Silla: row.Silla,
                Buro: row.Buro,
                Ventilador: row.Ventilador,
                Calefaccion: row.Calefaccion,
                Espejo: row.Espejo,
                Cortinas: row.Cortinas,
                TV: row.TV
            },
            servicios: {
                Internet: row.Internet,
                Agua_Cal: row.Agua_Cal,
                Electricidad: row.Electricidad,
                Gas: row.Gas,
                Limpieza: row.Limpieza,
                Agua_Pot: row.Agua_Pot
            },
            amenidades: {
                Cocina: row.Cocina,
                Refrigerador: row.Refrigerador,
                Microondas: row.Microondas,
                Lavadora: row.Lavadora,
                Secadora: row.Secadora,
                Sala: row.Sala,
                Cochera: row.Cochera,
                Patio: row.Patio,
                Estudio: row.Estudio
            },
            imagenes: {
                imagen1: row.imagen1 ? Buffer.from(row.imagen1).toString('base64') : null,
                imagen2: row.imagen2 ? Buffer.from(row.imagen2).toString('base64') : null,
                imagen3: row.imagen3 ? Buffer.from(row.imagen3).toString('base64') : null,
                imagen4: row.imagen4 ? Buffer.from(row.imagen4).toString('base64') : null,
                imagen5: row.imagen5 ? Buffer.from(row.imagen5).toString('base64') : null,
                imagen6: row.imagen6 ? Buffer.from(row.imagen6).toString('base64') : null
            }
        };
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alojamiento', error: error.message });
  }
}