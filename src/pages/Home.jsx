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
    const submitForm = async (e) => {
        e.preventDefault();
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
                window.open("https://form.carexpertindia.com/generate-pdf/" + cid, '_blank');
            }
        })

    }
    return (
        <>
            {
                loading ? (
                    <>
                        <section className="p-10">
                            <img src="https://cdn.dribbble.com/users/1726478/screenshots/3636280/gif-1.gif" alt="" className="max-w-full mx-auto" />
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
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Engine Number Last 5" />
                                                        <input type="text" maxLength={5} name="engine_no" onChange={handleFdata} className={form_control} required />
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
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Fitness Valid Till" />

                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('fitness_to', date)}
                                                            value={fdata?.fitness_to}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Tax Valid Till" />
                                                        {/* <input type="date" name="tax_valid_to" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('tax_valid_to', date)}
                                                            value={fdata?.tax_valid_to}
                                                        />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <FormLabel label="Insurance  Valid Till" />
                                                        {/* <input type="date" name="insurance_valid_to" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('insurance_valid_to', date)}
                                                            value={fdata?.insurance_valid_to}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Permit Valid Till" />
                                                        {/* <input type="date" name="permit_valid_to" onChange={handleFdata} className={form_control} required /> */}
                                                        <DatePicker className={form_control} format="y-MM-dd"
                                                            onChange={(date) => handleDateChange('permit_valid_to', date)}
                                                            value={fdata?.permit_valid_to}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter RTO City" />

                                                        <input type="text" name="rto_city" onChange={handleFdata} className={form_control} required />

                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Vehicle Color" />
                                                        <select name="vehicle_color" id="vehicle_color" onChange={handleFdata} className={form_control}>
                                                            <option value="">---Select---</option>
                                                            {
                                                                colors.map((itm) => (
                                                                    <>
                                                                        <option value={itm.color}>{itm.color}</option>
                                                                    </>
                                                                ))
                                                            }
                                                        </select>
                                                        {/* <input type="text" name="vehicle_color" onChange={handleFdata} className={form_control} /> */}
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Odometer" />
                                                        <input type="text" name="odometer" onChange={handleFdata} className={form_control} />
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
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Select Fule type" />
                                                        <div className="flex gap-2 flex-wrap">
                                                            {
                                                                ['Petrol', 'CNG', 'Diesel', 'Electric'].map((itm) => (
                                                                    <>
                                                                        <Radio label={itm} name="fuel" onChange={handleFdata} value={itm} />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
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
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Tyre Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={tyre} onChange={setType} />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Interior Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={interior} onChange={setInterior} />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Exterior  Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={exterior} onChange={setExterior} />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <FormLabel label="Enter Overall  Condition" />
                                                        <Rating className="max-w-full w-full" halfFillMode={'svg'} items={10} value={overall} onChange={setOverall} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2  gap-y-5 gap-5 mt-4">
                                                    <div className="lg:col-span-2 col-span-2">
                                                        <div className="p-2 bg-blue-gray-100 sectionTitle">
                                                            Photos
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2 w-full">
                                                        <div className="w-full">
                                                            <FormLabel label="Enter Front Image (Portrait Mode) " />
                                                            <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="front_portrait">
                                                                <input type="file" name="front_portrait" onChange={handleImageChange} id="front_portrait" className="hidden" />
                                                                <PlusOutlined /> Front Image
                                                            </label>
                                                            {images.front_portrait && (
                                                                <img
                                                                    src={URL.createObjectURL(images.front_portrait)}
                                                                    alt="Rear Landscape Preview"
                                                                    width="100"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2 w-full">
                                                        <div className="w-full">
                                                            <FormLabel label="Left Quarter Image (Portrait Mode) " />
                                                            <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                                htmlFor="left_quarter_panel">
                                                                <input type="file" name="left_quarter_panel" onChange={handleImageChange} id="left_quarter_panel" className="hidden" />
                                                                <PlusOutlined /> Left Quarter Panel
                                                            </label>
                                                            {images.left_quarter_panel && (
                                                                <img
                                                                    src={URL.createObjectURL(images.left_quarter_panel)}
                                                                    alt="Rear Landscape Preview"
                                                                    width="100"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2 w-full">
                                                        <div className="w-full">
                                                            <FormLabel label="Left  Image (Portrait Mode) " />
                                                            <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                                htmlFor="left_image">
                                                                <input type="file" name="left_image" onChange={handleImageChange} id="left_image" className="hidden" />
                                                                <PlusOutlined /> Left  Image
                                                            </label>
                                                            {images.left_image && (
                                                                <img
                                                                    src={URL.createObjectURL(images.left_image)}
                                                                    alt="Rear Landscape Preview"
                                                                    width="100"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Upload Rear  Image (Landscape  Mode) " />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                            htmlFor="rear_image">
                                                            <input type="file" name="rear_image" id="rear_image" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Upload Rear Image
                                                        </label>
                                                        {images.rear_image && (
                                                            <img
                                                                src={URL.createObjectURL(images.rear_image)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2 w-full">
                                                        <div className="w-full">
                                                            <FormLabel label="Right Quarter Image (Portrait Mode) " />
                                                            <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                                htmlFor="right_quarter_panel">
                                                                <input type="file" name="right_quarter_panel" onChange={handleImageChange} id="right_quarter_panel" className="hidden" />
                                                                <PlusOutlined /> Right Quarter Panel
                                                            </label>
                                                            {images.right_quarter_panel && (
                                                                <img
                                                                    src={URL.createObjectURL(images.right_quarter_panel)}
                                                                    alt="Rear Landscape Preview"
                                                                    width="100"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2 w-full">
                                                        <div className="w-full">
                                                            <FormLabel label="Right  Image (Portrait Mode) " />
                                                            <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                                htmlFor="right_image">
                                                                <input type="file" name="right_image" onChange={handleImageChange} id="right_image" className="hidden" />
                                                                <PlusOutlined /> Right Image
                                                            </label>
                                                            {images.right_image && (
                                                                <img
                                                                    src={URL.createObjectURL(images.right_image)}
                                                                    alt="Rear Landscape Preview"
                                                                    width="100"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Upload Interior Image (Landscape Mode)" />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                            htmlFor="interior_landscape">
                                                            <input type="file" name="interior_landscape" id="interior_landscape" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Upload Interior Image
                                                        </label>
                                                        {images.interior_landscape && (
                                                            <img
                                                                src={URL.createObjectURL(images.interior_landscape)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Upload Odometer (Landscape Mode)" />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="odometer_landscape">
                                                            <input type="file" name="odometer_landscape" id="odometer_landscape" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Upload Odometer Image
                                                        </label>
                                                        {images.odometer_landscape && (
                                                            <img
                                                                src={URL.createObjectURL(images.odometer_landscape)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>





                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Upload Engine Image (Landscape Mode)" />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="engine_landscape">
                                                            <input type="file" name="engine_landscape" id="engine_landscape" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Upload Engine Image
                                                        </label>
                                                        {images.engine_landscape && (
                                                            <img
                                                                src={URL.createObjectURL(images.engine_landscape)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Upload Tyre (Landscape Mode)" />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                            htmlFor="tyre_landscape">
                                                            <input type="file" name="tyre_landscape" id="tyre_landscape" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Tyre Landscape
                                                        </label>
                                                        {images.tyre_landscape && (
                                                            <img
                                                                src={URL.createObjectURL(images.tyre_landscape)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Chesis Imprint (Landscape Mode)" />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                            htmlFor="chesis_imprint">
                                                            <input type="file" name="chesis_imprint" id="chesis_imprint" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Chesis Imprint
                                                        </label>
                                                        {images.chesis_imprint && (
                                                            <img
                                                                src={URL.createObjectURL(images.chesis_imprint)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="lg:col-span-1 col-span-2">
                                                        <FormLabel label="Selfe with Car & Executive" />
                                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10"
                                                            htmlFor="car_selfe">
                                                            <input type="file" name="car_selfe" id="car_selfe" onChange={handleImageChange} className="hidden" />
                                                            <PlusOutlined /> Selfe with Car & Executive
                                                        </label>
                                                        {images.car_selfe && (
                                                            <img
                                                                src={URL.createObjectURL(images.car_selfe)}
                                                                alt="Rear Landscape Preview"
                                                                width="100"
                                                            />
                                                        )}
                                                    </div>
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
                                                                            width="100"
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
                                                        <input type="text" name="remark" onChange={handleFdata} className={form_control} />
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