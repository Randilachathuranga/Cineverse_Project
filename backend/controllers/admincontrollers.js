const Admin = require('../models/User');
const jwt = require('jsonwebtoken');

//login
exports.login = async (req, res) =>{
  try {
    const { username, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored password
    if (admin.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
}

//get admin details
exports.getAdmin = async (req, res) => {
  try {
    // Use findById to find an admin by ID
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.json(admin);
  } catch (err) {
    console.error('Error fetching admin:', err);
    res.status(500).json({ msg: 'Server error', err });
  }
};

//update admin 
// exports.updateAdmin = async (req, res) =>{
//   try{
//     const { username, email, name } = req.body;
    
//     const admin = await Admin.findByIdAndUpdate(
//       req.params.id,
//       {username, email, name},
//       {new: true}
//     );

//     if(!admin){
//       return res.status(404).json({ msg: 'Admin not found' });
//     }
//     res.json(admin);
//   }catch (err) {
//     res.status(500).json({ msg: 'Server error', err });
//   }
// }

// Delete admin by ID 
// exports.deleteAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.findByIdAndDelete(req.params.id);

//     if (!admin) {
//       return res.status(404).json({ msg: 'Admin not found' });
//     }

//     res.json({ msg: 'Admin deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', err });
//   }
// };