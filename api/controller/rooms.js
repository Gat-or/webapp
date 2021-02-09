const RoomModel = require('../model/rooms');

const RoomController = {

    searchRooms: function (req, res, next) {
        let searchTerm1 = req.params.searchTerm1;
        searchTerm1 = '%' + searchTerm1 + '%';
        let searchTerm2 = req.params.searchTerm2;
        searchTerm2 = '%' + searchTerm2 + '%';

        if (searchTerm2 == "%All%") {
            return RoomModel.search(searchTerm1)
                .then(([results, fields]) => {
                    console.log(results);
                    res.json(results);
                })
                .catch((err) => next(err));
        } else {
            return RoomModel.filterSearchByStreamingService(searchTerm1, searchTerm2)
                .then(([results, fields]) => {
                    console.log(results);
                    res.json(results);
                })
                .catch((err) => next(err));
        }
    },
    getRecentRooms: function (req, res, next) {// what the sql code is returning
        return RoomModel.retrieveRecentRooms()
            .then(([results, fields]) => {
                res.json(results);
            })
            .catch((err) => next(err));
    },
    getOldestRooms: function (req, res, next) {
        return RoomModel.retrieveOldestRooms()
            .then(([results, fields]) => {
                res.json(results);
            })
            .catch((err) => next(err));
    },
    getHighestViewedRooms: function (req, res, next) {
        return RoomModel.retrieveHighestViewedRooms()
            .then(([results, fields]) => {
                res.json(results);
            })
            .catch((err) => next(err));
    },
    getLowestViewedRooms: function (req, res, next) {
        return RoomModel.retrieveLowestViewedRooms()
            .then(([results, fields]) => {
                res.json(results);
            })
            .catch((err) => next(err));
    },
    getRoomById: function (req, res, next) {
        let _id = req.params.id;

        return RoomModel.retrieveRoomsById(_id)
            .then(([results, fields]) => {
                res.json(results[0]);
            })
            .catch((err) => next(err));
    },
    createRoom: function (req, res, next) {

        let description = req.body.description;
        let fk_userid = req.session.userID;
        let room_type;

        if (req.body.private) {
            room_type = 1;
        }
        else {
            room_type = 0;
        }

        if (!req.session.userID) {
            //create guest host
        }

        RoomModel.create(description, room_type, fk_userid)
            .then(([results, fields]) => {
                console.log(results[0].id)
                if (results) {
                    console.log(results[results.length - 1].id)
                    res.redirect('/room/' + results[results.length - 1].id);
                }
                else {
                    res.json({ status: "OK", message: "Room was not created", "redirect": "/" });
                }
            })
            .catch((err) => { next(err) });
    },
    updateRoomDescription: function (req, res, next) {
        let id = req.body.roomid;
        let description = req.body.roomdescription;

        RoomModel.changeRoomDescription(id, description)
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                res.status(204).send();

            } else {
                res.json({ message: "Room description could not be changed" });
            }

        })
        .catch((err) => {
            throw err;
        })
    },
    updateRoomTitle: function (req, res, next) {
        let id = req.body.roomid;
        let title = req.body.title;

        console.log("id: " + id);
        console.log("title " + title);

        RoomModel.changeRoomTitle(title, id)
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                res.status(204).send();

            } else {
                res.json({ message: "Room title could not be changed" });
            }

        })
        .catch((err) => {
            throw err;
        })
    },
    updateVideoType: function (req, res, next) {
        let id = req.body.roomid;
        let video_type = req.body.videoType;

        console.log("id: " + id);
        console.log("title " + video_type);

        RoomModel.changeVideoType(video_type, id)
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                res.status(204).send();

            } else {
                res.json({ message: "Room title could not be changed" });
            }

        })
        .catch((err) => {
            throw err;
        })
    },
    updateRoomPrivacy: function (req, res, next) {
        let id = req.body.roomid;
        let room_type;

        if (req.body.private) {
            room_type = 1;
        }
        else {
            room_type = 0;
        }

        console.log("Privacy is:  " + req.body.private)
        console.log("Room Number is: " + id);

        RoomModel.changeRoomPrivacy(room_type, id)
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    res.status(204).send();

                } else {
                    res.json({ message: "Room privacy could not be changed" });
                }

            })
            .catch((err) => {
                throw err;
            })
    },
    updateRoomThumbnail: function (req, res, next) {
        let id = req.body.roomid;
        let thumbnail = req.body.thumbnail;

        RoomModel.changeRoomThumbnail(thumbnail, id)
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    res.status(204).send();

                } else {
                    res.json({ message: "Room thumbnail could not be changed" });
                }

            })
            .catch((err) => {
                throw err;
            })
    },
    updateRoomSettings: function (req, res, next) {
        let id = req.body.roomid;
        let description = req.body.roomdescription;
        let room_type;
        if (req.body.private) {
            room_type = 1;
        }
        else {
            room_type = 0;
        }

        console.log(id);
        console.log(description);
        console.log(room_type);

        RoomModel.changeRoomDescription(description, id)
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                console.log("Description changed!")
                return RoomModel.changeRoomPrivacy(room_type, id);
            } else {
                res.json({ message: "Room description could not be changed" });
            }
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                res.status(204).send();
            } else {
                res.json({ message: "Room privacy could not be changed" });
            }

        })
        .catch((err) => {
            throw err;
        })
    },
    updateViewers: function (req, res, next) {
        let id = req.body.roomid;
        let viewers = req.body.viewers;
        //JSON.stringify(req.body.roomid)

        console.log("ROOM ID: " + JSON.stringify(req.body))
        console.log("VIEWERS: " + req.body.viewers)

        RoomModel.changeViewers(viewers, id)
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    res.status(204).send();

                } else {
                    res.json({ message: "Viewers could not be changed" });
                }

            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = RoomController;