import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {



   // mail 

//    const [formData, setFormData] = useState({ name: "", query: "", mobile: "" });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("https://shoopper-server.vercel.app/send-email", formData);
//             alert(response.data.message);
//         } catch (error) {
//             alert("Failed to send email.");
//         }
//     };

//     return (
//             <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
//             <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
//             <textarea name="query" placeholder="Your Query" onChange={handleChange} required></textarea>
//             <button type="submit">Send</button>
//         </form>
//     );
// };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type="email" placeholder='Your Email Id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
