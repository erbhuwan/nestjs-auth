#!/usr/bin/env node

/**
 * JWT Authentication Test Script
 * 
 * This script tests the JWT authentication system by:
 * 1. Starting the application
 * 2. Testing registration endpoint
 * 3. Testing login endpoint
 * 4. Testing protected endpoints
 * 5. Testing token refresh
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/v1';
let accessToken = '';
let refreshToken = '';

async function testRegistration() {
  console.log('🔐 Testing User Registration...');
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user'
    });

    console.log('✅ Registration successful');
    console.log('User ID:', response.data.data.user.id);
    console.log('Email:', response.data.data.user.email);
    
    accessToken = response.data.data.accessToken;
    refreshToken = response.data.data.refreshToken;
    
    return true;
  } catch (error: any) {
    console.log('❌ Registration failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testLogin() {
  console.log('\n🔑 Testing User Login...');
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'john.doe@example.com',
      password: 'password123'
    });

    console.log('✅ Login successful');
    console.log('Access Token:', response.data.data.accessToken.substring(0, 20) + '...');
    
    accessToken = response.data.data.accessToken;
    refreshToken = response.data.data.refreshToken;
    
    return true;
  } catch (error: any) {
    console.log('❌ Login failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testProtectedEndpoint() {
  console.log('\n🛡️ Testing Protected Endpoint...');
  
  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('✅ Protected endpoint accessed successfully');
    console.log('User Profile:', response.data.data);
    
    return true;
  } catch (error: any) {
    console.log('❌ Protected endpoint failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testTokenRefresh() {
  console.log('\n🔄 Testing Token Refresh...');
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken: refreshToken
    });

    console.log('✅ Token refresh successful');
    console.log('New Access Token:', response.data.data.accessToken.substring(0, 20) + '...');
    
    accessToken = response.data.data.accessToken;
    
    return true;
  } catch (error: any) {
    console.log('❌ Token refresh failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testLogout() {
  console.log('\n🚪 Testing Logout...');
  
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('✅ Logout successful');
    
    return true;
  } catch (error: any) {
    console.log('❌ Logout failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting JWT Authentication Tests\n');
  
  // Wait for server to be ready
  console.log('⏳ Waiting for server to be ready...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const tests = [
    { name: 'Registration', fn: testRegistration },
    { name: 'Login', fn: testLogin },
    { name: 'Protected Endpoint', fn: testProtectedEndpoint },
    { name: 'Token Refresh', fn: testTokenRefresh },
    { name: 'Logout', fn: testLogout }
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const success = await test.fn();
    if (success) passed++;
  }
  
  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! JWT authentication is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please check the implementation.');
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

export { runTests };
