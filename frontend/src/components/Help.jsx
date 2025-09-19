function Help()
{
    return(
        <div className="container my-3" style={{width:"100%",height:"auto"}}>
    <div className="container my-3 text-center">
        <h2>HELP DESK</h2>
    </div>
    <div className="my-5 text-start">
        <div>                   
            <label className="form-label fs-3" style={{fontWeight:"500"}}>Quick Assists</label>
        </div>
        <div>
            <hr/>
        </div>
    </div>
    <div className="row my-3">
        <div className="col col-4 text-start">
            <label className="form-label fs-5">
            General Information
            </label>
            <label className="form-label fs-6">
            What is face detection, and how does it work?

                What are the main applications of face detection technology?

                How is emotion detected using facial recognition?
            </label>
        </div>
        <div className="col col-4 text-start">
            <label className="form-label fs-5">
            Is my data safe? You’re not saving my face forever, right?
            </label>
            <label className="form-label fs-6">
            Nope! The system doesn’t store actual images unless you specifically save them for research or training. Your privacy is safe.
            </label>
        </div>
        <div className="col col-4 text-start">
            <label className="form-label fs-5">
            Why does my webcam look blurry?
            </label>
            <label className="form-label fs-6">
            Maybe it needs cleaning (seriously, wipe the lens), or try adjusting lighting and resolution settings.
            </label>
        </div>
    </div>

    <div className="row my-3">
        <div className="col col-4 text-start">
            <label className="form-label fs-5">
            I just want to test this quickly. How?
            </label>
            <label className="form-label fs-6">
            Open your webcam, run the script, make different faces, and see how it reacts.
            </label>
        </div>
        <div className="col col-4 text-start">
            <label className="form-label fs-5">
            Data Storage & Security

            </label>
            <label className="form-label fs-6">
            How does the system handle facial data?

Are user images stored for future analysis?

What privacy measures are in place?
            </label>
        </div>
        <div className="col col-4 text-start">
            <label className="form-label fs-5">
            Webcam & Live Detection
            </label>
            <label className="form-label fs-6">
            How do I enable real-time face detection?

Why is my webcam not working?

Can the system detect multiple faces at once?
            </label>
        </div>
    </div>
  <div className=" my-5 text-start">
    
    <h3>Contact Us</h3>
    <hr/>
    <table class="table">
    <thead>
        <tr>
        <th scope="col">S.no</th>
        <th scope="col">name</th>
        <th scope="col">contact</th>
        <th scope="col">location</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th scope="row">1</th>
        <td>Rajeswari</td>
        <td>Rajeswari@gmail.com</td>
        <td>hyderabad</td>
        </tr>
        <tr>
        <th scope="row">2</th>
        <td>shashi</td>
        <td>shashi@gmail.com</td>
        <td>mumbai</td>
        </tr>
        <tr>
        <th scope="row">3</th>
        <td>pratima</td>
        <td>pratima@gmail.com</td>
        <td>delhi</td>
        </tr>
    </tbody>
    </table>
  </div>
  <div className="my-5">
    <label></label>
  </div>
</div>
    )
}
export default Help;