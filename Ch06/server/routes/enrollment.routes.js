import express from 'express'
import enrollmentCtrl from '../controllers/enrollment.controller'
import courseCtrl from '../controllers/course.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

// Page 280
router.route('/api/enrollment/enrolled')
  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

// Page 266
router.route('/api/enrollment/new/:courseId')
  .post(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create)  

// Page 282
router.route('/api/enrollment/stats/:courseId')
  .get(enrollmentCtrl.enrollmentStats)

// Page 276
router.route('/api/enrollment/complete/:enrollmentId')
  .put(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete) 

// Page 270
router.route('/api/enrollment/:enrollmentId')
  .get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
  .delete(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.remove)

router.param('courseId', courseCtrl.courseByID)
router.param('enrollmentId', enrollmentCtrl.enrollmentByID)

export default router
