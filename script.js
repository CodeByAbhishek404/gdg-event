const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")
const body = document.body

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"
if (currentTheme === "dark") {
  body.classList.add("dark")
  themeIcon.textContent = "☀️"
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark")
  const isDark = body.classList.contains("dark")
  themeIcon.textContent = isDark ? "☀️" : "🌙"
  localStorage.setItem("theme", isDark ? "dark" : "light")

  updateHeaderBackground()
})

function updateCountdown() {
  // Set event date (December 15, 2024, 9:00 AM)
 const eventDate = new Date("2025-09-25T23:59:00").getTime();

  const now = new Date().getTime()
  const distance = eventDate - now

  if (distance < 0) {
    // Event has passed
    document.getElementById("days").textContent = "00"
    document.getElementById("hours").textContent = "00"
    document.getElementById("minutes").textContent = "00"
    document.getElementById("seconds").textContent = "00"
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  document.getElementById("days").textContent = days.toString().padStart(2, "0")
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
}

// Update countdown every second
updateCountdown()
setInterval(updateCountdown, 1000)

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

function updateHeaderBackground() {
  const header = document.querySelector(".header")
  const isDark = body.classList.contains("dark")

  if (window.scrollY > 100) {
    header.style.background = isDark ? "rgba(15, 23, 42, 0.98)" : "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"
  }
}

// Header Background on Scroll
window.addEventListener("scroll", updateHeaderBackground)

const registrationForm = document.getElementById("registrationForm")
const successMessage = document.getElementById("successMessage")
const overlay = document.getElementById("overlay")

registrationForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Enhanced validation
  if (!data.name || !data.email || !data.organization || !data.interest) {
    alert("Please fill in all required fields.")
    return
  }

  // Name validation - only alphabets and spaces, max 20 characters
  const nameRegex = /^[A-Za-z\s]{1,20}$/
  if (!nameRegex.test(data.name.trim())) {
    alert("Name should contain only alphabets and spaces, maximum 20 characters.")
    return
  }

  // Check for minimum name length
  if (data.name.trim().length < 2) {
    alert("Name should be at least 2 characters long.")
    return
  }

  // Email validation with more strict pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(data.email.trim())) {
    alert("Please enter a valid email address.")
    return
  }

  // Organization validation - max 50 characters, letters, numbers, spaces, and common punctuation
  const orgRegex = /^[A-Za-z0-9\s\-.,&()]{1,50}$/
  if (!orgRegex.test(data.organization.trim())) {
    alert(
      "Organization name should contain only letters, numbers, spaces, and common punctuation, maximum 50 characters.",
    )
    return
  }

  // Check for minimum organization length
  if (data.organization.trim().length < 2) {
    alert("Organization name should be at least 2 characters long.")
    return
  }

  // Simulate form submission
  console.log("Registration Data:", data)

  // Show success message
  showSuccessMessage()

  // Reset form
  this.reset()
})

function showSuccessMessage() {
  successMessage.classList.add("show")
  overlay.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeSuccessMessage() {
  successMessage.classList.remove("show")
  overlay.classList.remove("show")
  document.body.style.overflow = "auto"
}

// Close modal when clicking overlay
overlay.addEventListener("click", closeSuccessMessage)

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".highlight-card, .schedule-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Mobile Menu Toggle (for future enhancement)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links")
  navLinks.classList.toggle("mobile-open")
}

// Add some interactive hover effects
document.querySelectorAll(".highlight-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

console.log("[v0] GDG Galgotias website loaded successfully!")
