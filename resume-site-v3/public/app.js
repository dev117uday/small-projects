let front = {

	name: "Uday Yadav",
	level: "Sophomore",
	position: "CSE undergrad",
	aspiration: "Aspriring Software Engineer",
}

let second = {

	github: "https://github.com/dev117uday",
	instagram: "https://www.instagram.com/yadav117uday/",
	twitter: "https://twitter.com/yadav117uday",
	linkedin: "https://www.linkedin.com/in/uday-yadav-cs/",
	medium: "https://medium.com/@dev117uday",
	outlook: "yadav117uday@outlook.com",
	resume: "https://drive.google.com/file/d/1ZK0om7lU9x661_0X0FcYGuafhLSqD7nH/view",
}

let third = {
	first_para: "Hi, I am a CSE undergrad from GGSIP University. I am a passionate learner, interest in core cs concepts, different tools & frameworks to explore the world of computer science and software engineering.",
	second_para: "I can competently write code in many languages but mainly focuses on Golang, C++ & JavaScript. I love Go and making small projects in it, my goal is to be proficient in the long run. C++ and SQL for competitive coding and academia. I also know JavaScript, to do Web development in MEVN stack (V: Vue.js) to develop projects, working mostly with server-less cloud technologies.",
	A: "Core CS, HPC",
	B: "Js | MEVN Stack",
	C: "Golang",
	D: "C++",
}

let fifth = {
	rwd: "https://www.freecodecamp.org/certification/fcc0cda39bf-ae38-4f67-b60e-61d916c647aa/responsive-web-design",
	jsdsa: "https://www.freecodecamp.org/certification/fcc0cda39bf-ae38-4f67-b60e-61d916c647aa/javascript-algorithms-and-data-structures",
	am: "https://www.freecodecamp.org/certification/fcc0cda39bf-ae38-4f67-b60e-61d916c647aa/apis-and-microservices",
	git: "https://www.coursera.org/account/accomplishments/certificate/SRZPP22XC6XA",
	gcpcore: "https://www.coursera.org/account/accomplishments/certificate/QX2QRWG52P4T",
	oopdsc1: "https://www.coursera.org/account/accomplishments/certificate/6DW46CAND4R8",
	gml: "https://www.coursera.org/account/accomplishments/certificate/4U9WQ7FMJQL4",
	introjulia: "https://drive.google.com/file/d/1soVRsVmfsmUzM197nevGsCPJ71utafTP/view?usp=sharing",
	datav: "https://www.freecodecamp.org/certification/fcc0cda39bf-ae38-4f67-b60e-61d916c647aa/data-visualization",
}



//first
new Vue({

	el: "#front",
	data: {
		name: front.name,
		level: front.level,
		position: front.position,
		aspiration: front.aspiration,

	}

});

//second
new Vue({

	el: "#second",
	data: {
		github: second.github,
		instagram: second.instagram,
		twitter: second.twitter,
		linkedin: second.linkedin,
		medium: second.medium,
		outlook: second.outlook,
		resume: second.resume,
	}

});

//third
new Vue({
	el: "#third",
	data: {
		first_para: third.first_para,
		second_para: third.second_para,
		A: third.A,
		B: third.B,
		C: third.C,
		D: third.D,
	}
})

//fifth
new Vue({
	el: "#fifth",
	data: {
		rwd: fifth.rwd,
		jsdsa: fifth.jsdsa,
		am: fifth.am,
		git: fifth.git,
		gcpcore: fifth.gcpcore,
		oopdsc1: fifth.oopdsc1,
		gml: fifth.gml,
		introjulia: fifth.introjulia,
		datav: fifth.datav,
	}
})

