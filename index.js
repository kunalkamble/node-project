const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('Cound not connect to mongodb: ' + err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular 4 course',
        author: 'Kunal Kamble',
        tags: ['angular', 'frontend'],
        isPublished: false,
        price: 22
    });
    const result = await course.save();
    console.log(result);
}
// createCourse();

async function getCourses() {
    const pageNumber = 1;
    const pageSize = 10;
    const courses = await Course
        // .find({ author: 'Kunal', isPublished: true })
        // .find({ price: { $gte: 10, $lte: 12 } })
        .find({ isPublished: true, })
        .or([{ tags: 'node' }, { tags: 'angular' }, { price: { $gte: 15 } }, { name: /.*by*./ }])
        // .and([{ author: /.*a.*/i }, { isPublished: true }])
        // .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ price: 1 })
        .select({ name: 1, author: 1, price: 1 })
        // .count();
    console.log(courses);
}

async function run() {
    const courses = await getCourses();
}
// run();

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Json',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

// updateCourse('5afde28cbfb35d42e826f39c');

async function removeCourse(id) {
    const resutl = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('5afde28cbfb35d42e826f39c')