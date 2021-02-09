const express = require('express');
const router = express.Router();
const RoomController = require('../controller/rooms');

router.post('/createRoom', (req, res, next) => {
    RoomController.createRoom(req, res, next);
});

router.post('/updateRoomDescription', (req, res, next) => {
    RoomController.updateRoomDescription(req, res, next);
});

router.post('/updateRoomTitle', (req, res, next) => {
    RoomController.updateRoomTitle(req, res, next);
});

router.post('/updateRoomThumbnail', (req, res, next) => {
    RoomController.updateRoomThumbnail(req, res, next);
});

router.post('/updateVideoType', (req, res, next) => {
    RoomController.updateVideoType(req, res, next);
});

router.post('/updateRoomPrivacy', (req, res, next) => {
    RoomController.updateRoomPrivacy(req, res, next);
});

router.post('/updateViewers', (req, res, next) => {
    RoomController.updateViewers(req, res, next);
});

router.post('/updateRoomSettings', (req, res, next) => {
    RoomController.updateRoomSettings(req, res, next);
});

router.get('/search/:searchTerm1/:searchTerm2', (req, res, next) => {
    RoomController.searchRooms(req, res, next);
});

router.get('/getRecentRooms', (req, res, next) => {
    RoomController.getRecentRooms(req, res, next);
});

router.get('/getOldestRooms', (req, res, next) => {
    RoomController.getOldestRooms(req, res, next);
});

router.get('/getHighestViewedRooms', (req, res, next) => {
    RoomController.getHighestViewedRooms(req, res, next);
});

router.get('/getLowestViewedRooms', (req, res, next) => {
    RoomController.getLowestViewedRooms(req, res, next);
});

router.get('/getRoomById/:id', (req, res, next) => {
    RoomController.getRoomById(req, res, next);
});


module.exports = router;