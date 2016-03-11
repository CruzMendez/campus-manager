var courseModel = require('../models/courseModel.js');
var userModel = require('../models/userModel.js');

/**
* courseController.js
*
* @description :: Server-side logic for managing courses.
*/
module.exports = {
  
  /**
  * courseController.list()
  */
  list: function(req, res) {
    courseModel.find().populate('term').exec(function(err, courses){
      if(err) {
        return res.json(500, {
          message: 'Error getting course.'
        });
      }
      return res.json(courses);
    });
  },
  
  /**
  * courseController.show()
  */
  show: function(req, res) {
    var id = req.params.id;
    courseModel.findOne({_id: id}, function(err, course){
      if(err) {
        return res.json(500, {
          message: 'Error getting course.'
        });
      }
      if(!course) {
        return res.json(404, {
          message: 'No such course'
        });
      }
      return res.json(course);
    });
  },
  
  /**
  * courseController.create()
  */
  create: function(req, res) {
    var course = new courseModel({
      seats : req.body.seats
    });
    userModel.findOne({ _id: req.user.id }).populate('client').exec(function(err, currentUser) { 
      course.client = currentUser.client.id;
      course.save(function(err, course){
        if(err) {
          return res.json(500, {
            message: 'Error saving course',
            error: err
          });
        }
        return res.json({
          message: 'saved',
          _id: course._id
        });
      });
    });
  },
  
  /**
  * courseController.update()
  */
  update: function(req, res) {
    var id = req.params.id;
    courseModel.findOne({_id: id}, function(err, course){
      if(err) {
        return res.json(500, {
          message: 'Error saving course',
          error: err
        });
      }
      if(!course) {
        return res.json(404, {
          message: 'No such course'
        });
      }
      
      course.name =  req.body.name ? req.body.name : course.name;
      course.save(function(err, course){
        if(err) {
          return res.json(500, {
            message: 'Error getting course.'
          });
        }
        if(!course) {
          return res.json(404, {
            message: 'No such course'
          });
        }
        return res.json(course);
      });
    });
  },
  
  /**
  * courseController.remove()
  */
  remove: function(req, res) {
    var id = req.params.id;
    courseModel.findByIdAndRemove(id, function(err, course){
      if(err) {
        return res.json(500, {
          message: 'Error getting course.'
        });
      }
      return res.json(course);
    });
  }
};