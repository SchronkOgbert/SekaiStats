import os
import hashlib


def hash_string(value: str, salt: str):
    salt = bytes((salt[:5] + salt[3:] + salt[2:4]).encode())
    return hashlib.pbkdf2_hmac(
        'sha256',  # The hash digest algorithm for HMAC
        value.encode('utf-8'),  # Convert the password to bytes
        salt,  # Provide the salt
        100000,  # It is recommended to use at least 100,000 iterations of SHA-256
        dklen=128
    )


print(hash_string('12345', 'saltsaltsalt'))
