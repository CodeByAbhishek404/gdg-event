// Theme Toggle Functionality
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
})

// Countdown Timer
function updateCountdown() {
  // Set event date (December 15, 2024, 9:00 AM)
  const eventDate = new Date("2025-09-25T23:59:00").getTime();

  const now = new Date().getTime()
  const distance = eventDate - now

  if (distance < 0) {
    // Event has passed
    document.getElementById("days").textContent = "15"
    document.getElementById("hours").textContent = "60"
    document.getElementById("minutes").textContent = "60"
    document.getElementById("seconds").textContent = "60"
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

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = body.classList.contains("dark") ? "rgba(15, 23, 42, 0.98)" : "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = body.classList.contains("dark") ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"
  }
})

// Form Submission with Validation
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

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Organization validation - max 50 characters, no special characters except spaces and hyphens
  const orgRegex = /^[A-Za-z0-9\s-]{1,50}$/
  if (!orgRegex.test(data.organization.trim())) {
    alert("Organization name should contain only letters, numbers, spaces, and hyphens, maximum 50 characters.")
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

// Console log for debugging
console.log("[v0] GDG Galgotias website loaded successfully!")
console.log("[v0] Theme system initialized")
console.log("[v0] Countdown timer started")
console.log("[v0] Form validation ready")
console.log("[v0] Smooth scrolling enabled")
