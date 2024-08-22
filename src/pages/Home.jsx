import { Radio } from "@material-tailwind/react"
import FormLabel from "../elements/FormLabel"
import { API_URL, form_control } from "../utils"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React from "react"
import { PlusOutlined } from "@ant-design/icons"
import axios from "axios"


const Home = () => {
    const [engine, setEngine] = React.useState(0);
    const [tyre, setType] = React.useState(0);
    const [interior, setInterior] = React.useState(0);
    const [exterior, setExterior] = React.useState(0);
    const [overall, setOverall] = React.useState(0);
    const [models, setModels] = React.useState([]);
    const [btypes, setBtype] = React.useState([]);
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
    const submitForm = async () => {
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
            console.log(resp)
        })

    }
    return (
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
                            <div className="w-full p-10  rounded-lg bg-white ">

                                <div className="grid lg:grid-cols-2  grid-cols-1 gap-5">
                                    <div className="lg:col-span-2 col-span-1">
                                        <div className="p-2 bg-blue-gray-100 sectionTitle">
                                            Primary Info
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Executive Name" />
                                        <input type="text" name="executive_name" onChange={handleFdata} id="" className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Location" />
                                        <input type="text" name="address" onChange={handleFdata} id="" className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Name" />
                                        <input type="text" name="name" onChange={handleFdata} id="" className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Email" />
                                        <input type="text" name="email" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Registration Number" />
                                        <input type="text" name="registration_no" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Select Model" />
                                        <select name="model" onChange={handleFdata} className={form_control}>
                                            <option value="">---Select---</option>
                                            {
                                                models.map((itm) => (
                                                    <>
                                                        <option value={itm.model}>{itm.model}</option>
                                                    </>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Manufacture Year" />
                                        <input type="month" name="manufacturing_year" onChange={handleFdata} className={form_control} />
                                    </div>

                                    <div className="col-span-1">
                                        <FormLabel label="Select Body Type" />
                                        <select name="body_type" onChange={handleFdata} className={form_control}>
                                            <option value="">---Select---</option>
                                            {
                                                btypes.map((itm) => (
                                                    <>
                                                        <option value={itm.body_type}>{itm.body_type}</option>
                                                    </>
                                                ))
                                            }
                                        </select>
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
                                        <input type="date" name="registration_on" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Fitness Valid Till" />
                                        <input type="date" name="fitness_to" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Tax Valid Till" />
                                        <input type="date" name="tax_valid_to" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Permit Valid Till" />
                                        <input type="date" name="permit_valid_to" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Insurance  Valid Till" />
                                        <input type="date" name="insurance_valid_to" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter RTO City" />
                                        <input type="text" name="rto_city" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Vehicle Color" />
                                        <input type="text" name="vehicle_color" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Odometer" />
                                        <input type="text" name="odometer" onChange={handleFdata} className={form_control} />
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
                                                ['Yes', 'No', 'Other'].map((itm) => (
                                                    <>
                                                        <Radio label={itm} onChange={handleFdata} name="accident" value={itm} />
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <FormLabel label="Enter Refurbishing Estimate Cost" />
                                        <input type="text" name="refurbishing_cost" onChange={handleFdata} id="" className={form_control} />
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
                                                <PlusOutlined /> Upload Image
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
                                    <div className="lg:col-span-1 col-span-2">
                                        <FormLabel label="Enter Right  Image (Landscape  Mode) " />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="right_landscape">
                                            <input type="file" name="right_landscape" id="right_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
                                        </label>
                                        {images.right_landscape && (
                                            <img
                                                src={URL.createObjectURL(images.right_landscape)}
                                                alt="Rear Landscape Preview"
                                                width="100"
                                            />
                                        )}
                                    </div>
                                    <div className="lg:col-span-1 col-span-2">
                                        <FormLabel label="Enter Rear Image (Landscape Mode) " />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="rear_landscape">
                                            <input type="file" name="rear_landscape" id="rear_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
                                        </label>
                                        {images.rear_landscape && (
                                            <img
                                                src={URL.createObjectURL(images.rear_landscape)}
                                                alt="Rear Landscape Preview"
                                                width="100"
                                            />
                                        )}

                                    </div>
                                    <div className="lg:col-span-1 col-span-2">
                                        <FormLabel label="Upload Left Image (Landscape Mode)" />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="left_landscape">
                                            <input type="file" name="left_landscape" id="left_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
                                        </label>
                                        {images.left_landscape && (
                                            <img
                                                src={URL.createObjectURL(images.left_landscape)}
                                                alt="Rear Landscape Preview"
                                                width="100"
                                            />
                                        )}
                                    </div>
                                    <div className="lg:col-span-1 col-span-2">
                                        <FormLabel label="Upload Interior Image (Landscape Mode)" />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="interior_landscape">
                                            <input type="file" name="interior_landscape" id="interior_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
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
                                        <FormLabel label="Upload Engine Image (Landscape Mode)" />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="engine_landscape">
                                            <input type="file" name="engine_landscape" id="engine_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
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
                                        <FormLabel label="Upload Odometer (Landscape Mode)" />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="odometer_landscape">
                                            <input type="file" name="odometer_landscape" id="odometer_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
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
                                        <FormLabel label="Upload Tyre (Landscape Mode)" />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="tyre_landscape">
                                            <input type="file" name="tyre_landscape" id="tyre_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
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
                                        <FormLabel label="Upload Other (Landscape Mode)" />
                                        <label className="border border-primary text-center text-sm uppercase leading-10 text-primary block w-full border-dashed rounded min-h-10" htmlFor="other_landscape">
                                            <input type="file" name="other_landscape" id="other_landscape" onChange={handleImageChange} className="hidden" />
                                            <PlusOutlined /> Upload Image
                                        </label>
                                    </div>

                                    <div className="lg:col-span-1 col-span-2">
                                        <FormLabel label="Enter Expected Price" />
                                        <input type="text" name="expected_price" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="lg:col-span-2 col-span-2">
                                        <FormLabel label="Enter Remark" />
                                        <input type="text" name="remark" onChange={handleFdata} className={form_control} />
                                    </div>
                                    <div className="lg:col-span-2 col-span-2">
                                        <button onClick={submitForm} className="bg-primary text-xs uppercase  font-y tracking-wider shadow-sm shadow-secondary text-white px-5 rounded py-3 lg:w-fit w-full mt-5"> Submit</button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Home