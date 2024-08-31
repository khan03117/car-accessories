import { Radio } from "@material-tailwind/react"
import FormLabel from "../elements/FormLabel"
import { API_URL, btn, form_control } from "../utils"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React from "react"
import { PlusOutlined } from "@ant-design/icons"
import axios from "axios"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorSpan from "../elements/ErrorSpan"


const Home = () => {
    const [loading, setLoading] = React.useState(false);
    const [engine, setEngine] = React.useState(0);
    const [tyre, setType] = React.useState(0);
    const [interior, setInterior] = React.useState(0);
    const [exterior, setExterior] = React.useState(0);
    const [overall, setOverall] = React.useState(0);
    const [models, setModels] = React.useState([]);
    const [btypes, setBtype] = React.useState([]);
    const [others, setOthers] = React.useState(1);
    const [mname, setMname] = React.useState('');
    const [bodytype, setBodyType] = React.useState('');
    const [colors, setColors] = React.useState([]);
    const [clr, setClr] = React.useState('');
    const [fules, setFules] = React.useState([]);
    const [errors, setErrors] = React.useState([]);

    const getfules = async () => {
        const item = await axios.get(API_URL + 'car-fules');
        setFules(item.data.data);
    }
    const handleColor = (e) => {
        const val = e.target.value;
        setClr(val);
        if (val != "other") {
            setFdata((prev) => {
                return {
                    ...prev,
                    ['vehicle_color']: val
                };
            });
        }
    }

    const getcolors = async () => {
        const item = await axios.get(API_URL + 'car-colors');
        setColors(item.data.data);
    }
    const handleModelName = (e) => {
        const mn = e.target.value;
        setMname(mn);
        if (mn != "other") {
            setFdata((prev) => {
                return {
                    ...prev,
                    ['model']: mn
                };
            });
        }
    }
    const handleBodyType = (e) => {
        const btype = e.target.value;
        setBodyType(btype);
        if (btype != "other") {
            setFdata((prev) => {
                return {
                    ...prev,
                    ['body_type']: btype
                };
            });
        }
    }
    const getbtyeps = async () => {
        const items = await axios.get(API_URL + 'car-body');
        setBtype(items.data.data);
    }
    const getmodels = async () => {
        const items = await axios.get(API_URL + 'car-models');
        setModels(items.data.data)
    }
    React.useEffect(() => {
        getmodels();
        getbtyeps();
        getcolors();
        getfules();
    }, []);

    const [fdata, setFdata] = React.useState({});
    const [images, setImages] = React.useState({
        front_portrait: null,
        right_landscape: null,
        rear_landscape: null,
        left_landscape: null,
        interior_landscape: null,
        engine_landscape: null,
        odometer_landscape: null,
        tyre_landscape: null,
        other_landscape: null,
    });
    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setImages((prevImages) => ({
                ...prevImages,
                [name]: files[0],
            }));
        }
    };

    const handleFdata = (e) => {
        setFdata((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    };
    const handleDateChange = (name, date) => {
        setFdata((prev) => ({
            ...prev,
            [name]: date,
        }));
    };
    const handleOtherImage = () => {
        setOthers(others + 1)
    }
    const validation = () => {
        const err = [];
        if (!engine) {
            err.push({
                path: "engine",
                msg: "Engine rating is required"
            })
        }
        if (!tyre) {
            err.push({
                path: "tyre",
                msg: "Tyre rating is required"
            })
        }
        if (!interior) {
            err.push({
                path: "interior",
                msg: "Interior rating is required"
            })
        }
        if (!exterior) {
            err.push({
                path: "exterior",
                msg: "Exterior rating is required"
            })
        }
        if (!overall) {
            err.push({
                path: "overall",
                msg: "Overall rating is required"
            })
        }
        if (!fdata?.registration_on) {
            err.push({
                path: "registration_on",
                msg: "Registration Date is required"
            })
        }
        if (!fdata?.second_key) {
            err.push({
                path: "second_key",
                msg: "Second Key  is required"
            })
        }
        if (!fdata?.original_rc) {
            err.push({
                path: "original_rc",
                msg: "original rc  is required"
            })
        }
        if (!fdata?.transmission) {
            err.push({
                path: "transmission",
                msg: "Transmission  is required"
            })
        }
        if (!fdata?.no_of_owners) {
            err.push({
                path: "no_of_owners",
                msg: "No of Owner  is required"
            })
        }
        if (!fdata?.hypothecation) {
            err.push({
                path: "hypothecation",
                msg: "Hypothecation  is required"
            })
        }
        if (!fdata?.fuel) {
            err.push({
                path: "fuel",
                msg: "Fuel  is required"
            })
        }
        if (!fdata?.fitness_to) {
            err.push({
                path: "fitness_to",
                msg: "Fitness_to  is required"
            })
        }
        if (!fdata?.tax_valid_to) {
            err.push({
                path: "tax_valid_to",
                msg: "tax_valid_to  is required"
            })
        }
        if (!fdata?.permit_valid_to) {
            err.push({
                path: "permit_valid_to",
                msg: "permit_valid_to  is required"
            })
        }
        if (!fdata?.insurance_valid_to) {
            err.push({
                path: "insurance_valid_to",
                msg: "insurance_valid_to  is required"
            })
        }
        if (err.length > 0) {
            setErrors(err);
            console.log(err)
            return false;
        } else {
            return true;
        }
    }
    const submitForm = async (e) => {
        e.preventDefault();
        if (!validation()) {
            console.log(errors)
            return false;
        }
        setLoading(true)
        const Fodata = new FormData();
        Object.entries(fdata).forEach(([key, value]) => {
            Fodata.append(key, value);
        });
        for (const key in images) {
            if (images[key]) {
                Fodata.append(key, images[key]);
            }
        }
        Fodata.append('engine', engine);
        Fodata.append('tyre', tyre);
        Fodata.append('interior', interior);
        Fodata.append('exterior', exterior);
        Fodata.append('overall', overall);
        await axios.post(API_URL + 'car-details', Fodata).then((resp) => {
            if (resp.data.data) {
                setLoading(false)
                const cid = resp.data.data;
                setImages({});
                window.open("https://form.carexpertindia.com/admin/generate-pdf/" + cid, '_blank');
            }
        })

    }
    const imagesarr = [
        'front_photo',
        'front_right_corner_photo',
        'right_photo',
        'rear_right_corner_photo',
        'rear_photo',
        'rear_left_corner_photo',
        'left_photo',
        'front_left_corner_photo',
        'odometer_photo',
        'interior_photo',
        'engine_photo',
        'tyre_photo',
        'chesis_photo',
        'selfe_with_car_photo'
    ];
    return (
        <>
            {
                loading ? (
                    <>
                        <section className="p-10">
                            <img src="https://cdn.dribbble.com/users/1726478/screenshots/3636280/gif-1.gif" alt="" className="max-w-full mx-auto" />
                            <div className="w-100 p-10">
                                <p className="text-sm">
                                    Your pdf is being generated. Please wait...
                                </p>
                            </div>
                        </section>

                    </>
                ) : (
                    <>

                        <section className="pb-20 bg-blue-gray-100 min-h-lvh">

                            <div className="container mx-auto p-4">

                                <div className="grid lg:grid-cols-12 grid-cols-1 gap-6">
                                    <div className="lg:col-span-4 col-span-1">
                                        <div className="w-full bg-white rounded p-4">
                                            <h4 className="font-bold text-lg block mb-4">
                                                Instructions
                                            </h4>
                                            <ul className="list-disc list-inside *:text-sm">
                                                <li>
                                                    All fields are mandatory
                                                </li>
                                                <li>
                                                    Photos should be clear.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-8 col-span-1">
                                        <form onSubmit={submitForm}>


                                            <div className="w-full p-10  rounded-lg bg-white ">

                                                <div className="grid lg:grid-cols-2  grid-cols-1 gap-5">
                                                    <div className="lg:col-span-2 col-span-1">
                                                        <div className="p-2 bg-blue-gray-100 sectionTitle">
                                                            Primary Info
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Executive Name" />
                                                        <input type="text" name="executive_name" onChange={handleFdata} id="" className={form_control} required />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Location" />
                                                        <input type="text" name="address" onChange={handleFdata} id="" className={form_control} required />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Owner Name" />
                                                        <input type="text" name="name" onChange={handleFdata} id="" className={form_control} required />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Registration Number" />
                                                        <input type="text" name="registration_no" onChange={handleFdata} className={form_control} required />
                                                        <ErrorSpan errors={errors} path="registration_no" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Select Model" />

                                                        <select onChange={handleModelName} className={form_control} required>
                                                            <option value="">---Select---</option>
                                                            {
                                                                models.map((itm) => (
                                                                    <>
                                                                        <option value={itm.model}>{itm.model}</option>
                                                                    </>
                                                                ))
                                                            }
                                                            <option value="other">Other</option>
                                                        </select>
                                                        {
                                                            mname == "other" && (
                                                                <>
                                                                    <div className="w-full mt-2">
                                                                        <input type="text" placeholder="Enter Modal Name here" name="model" onChange={handleFdata} className={form_control} required />
                                                                    </div>

                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Manufacture Year" />
                                                        <input type="month" name="manufacturing_year" onChange={handleFdata} className={form_control} required />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <FormLabel label="Select Body Type" />
                                                        <select onChange={handleBodyType} className={form_control} required>
                                                            <option value="">---Select---</option>
                                                            {
                                                                btypes.map((itm) => (
                                                                    <>
                                                                        <option value={itm.body_type}>{itm.body_type}</option>
                                                                    </>
                                                                ))
                                                            }
                                                            <option value="other">Other</option>
                                                        </select>
                                                        {
                                                            bodytype == "other" && (
                                                                <>
                                                                    <div className="w-full mt-3">
                                                                        <input type="text" placeholder="Enter body type" name="body_type" onChange={handleFdata} className={form_control} required />
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                <div className="grid lg:grid-cols-2  grid-cols-1 gap-5 mt-4">
                                                    <div className="lg:col-span-2 col-span-1">
                                                        <div className="p-2 bg-blue-gray-100 sectionTitle">
                                                            Vehical Validity
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Date Of Registration" />
                                                        {/* <input type="date" name="registration_on" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker format="y-MM-dd" className={form_control}
                                                            onChange={(date) => handleDateChange('registration_on', date)}
                                                            value={fdata?.registration_on}
                                                        />
                                                        <ErrorSpan errors={errors} path="registration_on" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Engine Number Last 5" />
                                                        <input type="text" maxLength={5} name="engine_no" onChange={handleFdata} className={form_control} required />
                                                        <ErrorSpan errors={errors} path="engine_no" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Chesis Number Last 5" />
                                                        <input type="text" maxLength={5} name="chesis_no" onChange={handleFdata} className={form_control} required />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Original RC Available" />
                                                        <div className="flex gap-2 ">
                                                            {
                                                                ['Yes', 'No'].map((itm) => (
                                                                    <>
                                                                        <Radio label={itm} onChange={handleFdata} name="original_rc" value={itm} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <ErrorSpan errors={errors} path="original_rc" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Second Key Available" />
                                                        <div className="flex gap-2 ">
                                                            {
                                                                ['Yes', 'No'].map((itm) => (
                                                                    <>
                                                                        <Radio label={itm} onChange={handleFdata} name="second_key" value={itm} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <ErrorSpan errors={errors} path="second_key" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Fitness Valid Till" />

                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('fitness_to', date)}
                                                            value={fdata?.fitness_to}
                                                        />
                                                        <ErrorSpan errors={errors} path="fitness_to" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Tax Valid Till" />
                                                        {/* <input type="date" name="tax_valid_to" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('tax_valid_to', date)}
                                                            value={fdata?.tax_valid_to}
                                                        />
                                                        <ErrorSpan errors={errors} path="tax_valid_to" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <FormLabel label="Insurance  Valid Till" />
                                                        {/* <input type="date" name="insurance_valid_to" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('insurance_valid_to', date)}
                                                            value={fdata?.insurance_valid_to}
                                                        />
                                                        <ErrorSpan errors={errors} path="insurance_valid_to" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Permit Valid Till" />
                                                        {/* <input type="date" name="permit_valid_to" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('permit_valid_to', date)}
                                                            value={fdata?.permit_valid_to}
                                                        />
                                                        <ErrorSpan errors={errors} path="permit_valid_to" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter RTO City" />

                                                        <input type="text" name="rto_city" onChange={handleFdata} className={form_control} required />

                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Vehicle Color" />
                                                        <select onChange={handleColor} className={form_control}>
                                                            <option value="">---Select---</option>
                                                            {
                                                                colors.map((itm) => (
                                                                    <>
                                                                        <option value={itm.color}>{itm.color}</option>
                                                                    </>
                                                                ))
                                                            }
                                                            <option value="other">other</option>
                                                        </select>
                                                        {
                                                            clr == "other" && (
                                                                <>
                                                                    <div className="w-full mt-3">
                                                                        <input type="text" placeholder="Enter custom color" name="vehicle_color" onChange={handleFdata} className={form_control} required />
                                                                    </div>
                                                                </>
                                                            )
                                                        }

                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Odometer" />
                                                        <input type="text" name="odometer" onChange={handleFdata} className={form_control} required />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter No of Owners" />
                                                        <input type="number" name="no_of_owners" min={1} onChange={handleFdata} className={form_control} required />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Hypothecation Status" />
                                                        <div className="flex gap-2 ">
                                                            {
                                                                ['Yes', 'No'].map((itm) => (
                                                                    <>
                                                                        <Radio label={itm} onChange={handleFdata} name="hypothecation" value={itm} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <ErrorSpan errors={errors} path="hypothecation" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Select Transmission Status" />
                                                        <div className="flex gap-2 ">
                                                            {
                                                                ['Automatic', 'Manual'].map((itm) => (
                                                                    <>
                                                                        <Radio label={itm} onChange={handleFdata} name="transmission" value={itm} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <ErrorSpan errors={errors} path="transmission" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Select Fule type" />
                                                        <div className="flex gap-2 flex-wrap">
                                                            {
                                                                fules.map((itm) => (
                                                                    <>
                                                                        <Radio label={itm.fuel} name="fuel" onChange={handleFdata} value={itm.fuel} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <ErrorSpan errors={errors} path="fuel" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Select Accidental Status" />
                                                        <div className="flex gap-2 ">
                                                            {
                                                                ['Yes', 'No'].map((itm) => (
                                                                    <>
                                                                        <Radio label={itm} onChange={handleFdata} name="accident" value={itm} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <ErrorSpan errors={errors} path="accident" />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Refurbishing Estimate Cost" />
                                                        <input type="number" name="refurbishing_cost" onChange={handleFdata} id="" className={form_control} required />
                                                    </div>

                                                </div>

                                                <div className="grid lg:grid-cols-2  grid-cols-1 gap-5 mt-4">
                                                    <div className="lg:col-span-2 col-span-1">
                                                        <div className="p-2 bg-blue-gray-100 sectionTitle">
                                                            Conditions
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Engine Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={engine} onChange={setEngine} />
                                                        <ErrorSpan errors={errors} path="engine" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Tyre Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={tyre} onChange={setType} />
                                                        <ErrorSpan errors={errors} path="tyre" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Interior Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={interior} onChange={setInterior} />
                                                        <ErrorSpan errors={errors} path="interior" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Exterior  Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={exterior} onChange={setExterior} />
                                                        <ErrorSpan errors={errors} path="exterior" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Overall  Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={overall} onChange={setOverall} />
                                                        <ErrorSpan errors={errors} path="overall" />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2  gap-y-5 gap-5 mt-4">
                                                    <div className="lg:col-span-2 col-span-2">
                                                        <div className="p-2 bg-blue-gray-100 sectionTitle">
                                                            Photos
                                                        </div>
                                                    </div>
                                                    {
                                                        imagesarr.map((img) => (
                                                            <>
                                                                <div className="lg:col-span-1 col-span-2 w-full">
                                                                    <div className="w-full">
                                                                        <FormLabel label={'Upload ' + img.split('_').join(' ')} />
                                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                                            htmlFor={img}>
                                                                            <input type="file" name={img} onChange={handleImageChange} id={img} className="hidden" />
                                                                            <PlusOutlined /> {img.split('_').join(' ')}
                                                                        </label>
                                                                        {images[img] && (
                                                                            <img className="w-full"
                                                                                src={URL.createObjectURL(images[img])}
                                                                                alt={img}

                                                                            />
                                                                        )}
                                                                        <ErrorSpan errors={errors} path={img} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ))
                                                    }

                                                    {
                                                        [...Array(others)].map((a, index) => (
                                                            <>
                                                                <div key={a} className="lg:col-span-1 col-span-2">
                                                                    <FormLabel label="Upload Other (Landscape Mode)" />
                                                                    <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                                        htmlFor={'other_landscape' + index}>
                                                                        <input type="file" name={'other_landscape' + index} id={'other_landscape' + index} onChange={handleImageChange} className="hidden" />
                                                                        <PlusOutlined /> Upload Other Image
                                                                    </label>
                                                                    {images['other_landscape' + index] && (
                                                                        <img
                                                                            src={URL.createObjectURL(images['other_landscape' + index])}
                                                                            alt="Rear Landscape Preview"
                                                                            className="w-full"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </>
                                                        ))
                                                    }
                                                    <div className="lg:col-span-2 col-span-2">
                                                        <button type="button" onClick={handleOtherImage} className={btn}>Add More</button>
                                                    </div>



                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Enter Expected Price" />
                                                        <input type="number" name="expected_price" onChange={handleFdata} className={form_control} />
                                                    </div>
                                                    <div className="lg:col-span-2 col-span-2">
                                                        <FormLabel label="Enter Remark" />
                                                        <textarea name="remark" id="remark" onChange={handleFdata} className={form_control}></textarea>

                                                    </div>
                                                    <div className="lg:col-span-2 col-span-2">
                                                        <button type="submit" className="bg-primary text-xs uppercase  font-y tracking-wider shadow-sm shadow-secondary text-white px-5 rounded py-3 lg:w-fit w-full mt-5"> Submit</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Home