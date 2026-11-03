
# 1. Use Python 3.12 as the base image
FROM python:3.12-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Prevent Python from creating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# 4. Ensure Python logs appear immediately
ENV PYTHONUNBUFFERED=1

# 5. Copy the dependency file into the container
COPY requirements.txt .

# 6. Install the Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 7. Copy the application code into the container
COPY app/ ./app/

# 8. Copy the trained machine learning model
COPY model/ ./model/

# 9. Document the port used by the application
EXPOSE 8000

# 10. Start the FastAPI application
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
