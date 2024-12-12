const registrations = [];

// GET: Fetch all stored Webmentions
async function getRegistrations(req, res) {
    try {
        res.status(200).json(registrations);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve registrations' });
    }
}

// POST: Handle incoming Webmentions
async function postRegistration(req, res) {
    try {
        const genders = ["Male", "Female", "Non-binary", "Other"];
        const sexualities = ["Straight", "Gay", "Bi-sexual", "Other"];
        let valid = true;

        const { firstname, lastname, birth, email, gender, sexuality } = req.body;

        // Validate firstname
        if (!firstname || firstname.trim().length === 0) {
            valid = false;
            return res.status(400).json({ message: 'firstname is required' });
        }

        // Validate lastname
        if (!lastname || lastname.trim().length === 0) {
            valid = false;
            return res.status(400).json({ message: 'lastname is required' });
        }

        // Validate date of birth
        if (!birth) {
            valid = false;
            return res.status(400).json({ message: 'dateOfBirth is required' });
        }
        if (isNaN(Date.parse(birth))){
            valid = false;
            return res.status(400).json({ message: 'dateOfBirth must be valid type' });
        }
        const age = calculateAge(birth);
        if (age < 18) {
            valid = false;
            return res.status(400).json({ message: "You must be 18 years or older" });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            valid = false;
            return res.status(400).json({ message: 'email is required' });
        }

        // Validate gender
        if (!gender || !genders.includes(gender)) {
            valid = false;
            return res.status(400).json({ message: 'gender is required' });
        }

        // Validate sexuality
        if (!sexuality || !sexualities.includes(sexuality)) {
            valid = false;
            return res.status(400).json({ message: 'sexyality is required' });
        }

        // Store the Webmention
        registrations.push({ firstname, lastname, birth, email, gender, sexuality });

        res.status(202).json({ message: 'registration accepted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' + error });
    }
}

// Helper functions
const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
  
module.exports = {
    getRegistrations,
    postRegistration,
};
