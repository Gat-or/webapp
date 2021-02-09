const db = require('../conf/database');

const RoomModel = {
    search: function (searchTerm) {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username  \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE (description LIKE ? or username LIKE ?) and r.room_type=0;';

        return db.query(baseSQL, [searchTerm, searchTerm]);
    },
    filterSearchByStreamingService: function (searchTerm1, searchTerm2) {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username  \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE (description LIKE ? or username LIKE ?) and video_type LIKE ? and room_type=0;';

        return db.query(baseSQL, [searchTerm1, searchTerm1, searchTerm2]);
    },
    retrieveRecentRooms: function () {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE r.room_type=0\
        ORDER BY created DESC \
        LIMIT 64';
        
        return db.query(baseSQL);
    },
    retrieveOldestRooms: function () {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE r.room_type=0\
        ORDER BY created ASC \
        LIMIT 64';
        
        return db.query(baseSQL);
    },
    retrieveHighestViewedRooms: function () {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE r.room_type=0\
        ORDER BY viewer_count DESC \
        LIMIT 64';
        
        return db.query(baseSQL);
    },
    retrieveLowestViewedRooms: function () {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE r.room_type=0\
        ORDER BY viewer_count ASC \
        LIMIT 64';
        
        return db.query(baseSQL);
    },
    retrieveRoomsById: function (_id) {
        let baseSQL = 'SELECT r.id, r.title, r.description, r.video_type, r.thumbnail, r.created, r.viewer_count, r.room_type, u.username \
        FROM rooms r \
        JOIN users u on r.fk_userid=u.id \
        WHERE r.id=?;';

        return db.query(baseSQL, _id);
    },
    changeRoomDescription: function (description, id) {
        let baseSQL = 'UPDATE rooms \
        SET description = ?\
        WHERE id = ?';
        return db.execute(baseSQL, [description, id])
        .catch((err) => {
            throw err;
        })
    },
    changeRoomTitle: function (title, _id) {
        let baseSQL = 'UPDATE rooms \
        SET title = ?\
        WHERE id = ?';

        return db.execute(baseSQL, [title, _id])
        .catch((err) => {
            throw err;
        })
    },
    changeVideoType: function (video_type, _id) {
        let baseSQL = 'UPDATE rooms \
        SET video_type = ?\
        WHERE id = ?';

        return db.execute(baseSQL, [video_type, _id])
        .catch((err) => {
            throw err;
        })
    },
    changeRoomPrivacy: function (room_type, id) {
        let baseSQL = 'UPDATE rooms \
        SET room_type = ?\
        WHERE id = ?';
        return db.execute(baseSQL, [room_type, id])
        .catch((err) => {
            throw err;
        })
    },
    changeRoomThumbnail: function (thumbnail, _id) {
        let baseSQL = `UPDATE rooms 
        SET thumbnail = ? 
        WHERE id = ?`;
        return db.execute(baseSQL, [thumbnail, _id])
        .catch((err) => {
            throw err;
        })
    },
    changeViewers: function (viewers, _id) {
        let baseSQL = `UPDATE rooms 
        SET viewer_count = ? 
        WHERE id = ?`;
        return db.execute(baseSQL,[viewers, _id])
        .catch((err) => {
            throw err;
        })
    },
    create: function (description, room_type, fk_userid) {
        let baseSQL = 'INSERT INTO rooms (description, room_type, created, fk_userid) VALUE (?, ?, now(), ?)';
        return db.execute(baseSQL, [description, room_type, fk_userid])
        .catch((err) => { next(err) })
        .then(()=> {
            let baseSQL = 'SELECT r.id \
            FROM rooms r\
            JOIN users u on r.fk_userid=u.id\
            WHERE r.fk_userid=?';

            return db.query(baseSQL, fk_userid);
        })

    }
    //create: function (title, descrip)


}

module.exports = RoomModel;